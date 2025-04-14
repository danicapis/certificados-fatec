router.get('/pdf/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const edital = await Edital.findById(id);
    if (!edital) return res.status(404).send('Edital não encontrado');

    const modeloBytes = fs.readFileSync(modeloPath);
    const pdfDoc = await PDFDocument.load(modeloBytes);
    const pages = pdfDoc.getPages();
    const page = pages[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const drawText = (text, x, y, size = 12) => {
      page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
    };

    // Dados principais
    drawText(edital.n_edital, 310, 635, 11); // Nº do edital
    drawText(edital.n_processo, 380, 610, 11); // Nº do processo
    drawText(edital.portaria, 230, 585, 11); // Portaria
    drawText(edital.disciplina, 125, 537, 11); // Disciplina
    drawText(edital.curso, 125, 517, 11); // Curso

    // Membros da banca (até 3 membros)
    edital.banca.forEach((nome, i) => {
      const y = 455 - i * 30;
      drawText(`${i + 1}. ${nome}`, 100, y, 11);
    });

    // Local e Data
    const dataHoje = new Date();
    const dataFormatada = dataHoje.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    drawText(`São Paulo, ${dataFormatada}`, 100, 250, 11);

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=certificado.pdf');
    res.send(pdfBytes);

  } catch (err) {
    console.error('Erro ao gerar PDF:', err);
    res.status(500).send('Erro ao gerar certificado PDF');
  }
});
