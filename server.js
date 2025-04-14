require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

const certificadoRoutes = require('./routes/certificado');
app.use('/certificado', certificadoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
