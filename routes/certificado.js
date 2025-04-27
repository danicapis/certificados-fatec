const express = require('express');
const router = express.Router();
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const Edital = require('../models/Edital');

const modeloPath = path.join(__dirname, '../assets/modelo-certificado.pdf');

router.get('/pdf/:id', async (req, res) => {
  try {
    const edital = await Edital.findById(req.params.id);
    if (!edital) return res.status(404).send('Edital não encontrado');

    const modeloBytes = fs.readFileSync(modeloPath);
    const pdfDoc = await PDFDocument.load(modeloBytes);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const drawText = (text, x, y, size = 12) => {
      page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
    };

    const drawWhiteBox = (x, y, width, height) => {
      page.drawRectangle({ x, y, width, height, color: rgb(1, 1, 1) });
    };

    const presidenteNome = edital.banca[0] || 'Nome do Presidente';

    drawWhiteBox(135, 640, 300, 15);
    drawText(`${presidenteNome}`, 135, 640, 12);

    drawWhiteBox(340, 618, 150, 15);
    drawText(edital.n_edital || '', 340, 618, 12);

    drawWhiteBox(150, 598, 300, 15);
    drawText(edital.n_processo || '', 150, 598, 12);

    drawWhiteBox(130, 577, 300, 15);
    drawText(edital.disciplina || '', 130, 577, 12);

    drawWhiteBox(130, 557, 300, 15);
    drawText(edital.curso || '', 130, 557, 12);

    let startY = 500;
    edital.banca.forEach((nome, index) => {
      drawWhiteBox(130, startY, 400, 15);
      drawText(`${index + 1}. ${nome}`, 130, startY, 12);
      startY -= 20;
    });

    drawWhiteBox(130, 140, 300, 15);
    drawText(`${presidenteNome}`, 130, 140, 12);

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
