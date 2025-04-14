const mongoose = require('mongoose');

const EditalSchema = new mongoose.Schema({
  n_edital: String,
  n_processo: String,
  portaria: String,
  seção: String,
  deliberação: String,
  disciplina: String,
  curso: String,
  banca: Array,
});

// Força o nome exato da coleção: 'editais'
module.exports = mongoose.model('Edital', EditalSchema, 'editais');
