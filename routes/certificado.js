const express = require('express');
const router = express.Router();
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const Edital = require('../models/Edital');
const Professor = require('../models/Professor');

const modeloPath = path.join(__dirname, '../assets/modelo_formulario.pdf');

router.get('/pdf/:id', async (req, res) => {
  try {
    const edital = await Edital.findById(req.params.id);
    if (!edital) return res.status(404).send('Edital não encontrado');

    const professores = await Professor.find({ nome: { $in: edital.banca } });
    if (!professores || professores.length === 0) {
      return res.status(404).send('Professores não encontrados');
    }

    const modeloBytes = fs.readFileSync(modeloPath);
    const pdfDoc = await PDFDocument.load(modeloBytes);
    const form = pdfDoc.getForm();

    form.getTextField('Text1').setText(professores[0].nome || '');
    form.getTextField('Text2').setText(edital.n_edital || '');
    form.getTextField('Text3').setText(edital.disciplina || '');
    form.getTextField('Text5').setText(edital.n_processo || '');
    form.getTextField('Text6').setText(edital.banca[0] || '');
    form.getTextField('Text7').setText(edital.banca[1] || '');
    form.getTextField('Text9').setText(edital.banca[2] || '');

    form.flatten();

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=certificado.pdf');
    res.send(pdfBytes);

  } catch (err) {
    console.error('Erro ao gerar o certificado PDF:', err);
    res.status(500).send('Erro ao gerar certificado PDF');
  }
});

module.exports = router;
