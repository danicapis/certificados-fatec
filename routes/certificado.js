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

  // Nome do membro da banca (presidente)
drawWhiteBox(161, 690, 300, 15);
drawText(`${presidenteNome}`, 161, 690, 12);

// Nº do edital
drawWhiteBox(256, 669, 150, 15);
drawText(edital.n_edital || '', 256, 669, 12);

// Nº do processo
drawWhiteBox(36, 633, 150, 15);
drawText(edital.n_processo || '', 36, 633, 12);

// Nome da disciplina
drawWhiteBox(157, 649, 300, 15);
drawText(edital.disciplina || '', 157, 649, 12);

// Curso
drawWhiteBox(195, 523, 300, 15);
drawText(edital.curso || '', 195, 523, 12);

// Lista de membros da banca
let startY = 470;
edital.banca.forEach((nome, index) => {
  drawWhiteBox(135, startY, 400, 15);
  drawText(`${index + 1}. ${nome}`, 135, startY, 12);
  startY -= 20;
});

// Assinatura (nome do presidente novamente)
drawWhiteBox(140, 157, 300, 15);
drawText(`${presidenteNome}`, 140, 157, 12);


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
