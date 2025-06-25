const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
  nome: String,
  cargo: String,
  editais: Array,
  instituicao: String,  
});

module.exports = mongoose.model('Professor', ProfessorSchema, 'professores');  // Alterei para 'professores' e usei o ProfessorSchema
