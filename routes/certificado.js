const express = require('express');
const router = express.Router();
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const Edital = require('../models/Edital'); 

const modeloPath = path.join(__dirname, '../assets/Modelo de cert.pdf');

router.get('/pdf/:id', async (req, res) => {
  try {
    const edital = await Edital.findById(req.params.id);
    console.log('Edital encontrado:', edital);

    if (!edital) return res.status(404).send('Edital não encontrado');

    const modeloBytes = fs.readFileSync(modeloPath);
    const pdfDoc = await PDFDocument.load(modeloBytes);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const drawText = (text, x, y, size = 12) => {
      page.drawText(text, {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });
    };

    
    const presidenteNome = edital.banca[0] || 'Presidente Nome';

    
    const dataObj = new Date(edital.data_edital);
    const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    
    drawText(`Dr(a). ${presidenteNome}`, 135, 640, 12);

    
    drawText(edital.n_edital || '', 340, 618, 12);

    
    drawText(edital.n_processo || '', 150, 598, 12);

    
    drawText(edital.disciplina || '', 130, 577, 12);

   
    drawText(edital.curso || '', 130, 557, 12);

    
    drawText(`São Paulo, ${dataFormatada}`, 380, 220, 12);

    
    drawText(`Dr(a). ${presidenteNome}`, 130, 140, 12);

  
    let startY = 500;
    edital.banca.forEach((nome, index) => {
      drawText(`${index + 1}. ${nome}`, 130, startY, 12);
      startY -= 20;
    });

    
    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=certificado.pdf');
    res.send(pdfBytes);

  } catch (err) {
    console.error('Erro gerando o certificado PDF:', err);
    res.status(500).send('Erro ao gerar certificado PDF');
  }
});

module.exports = router;
