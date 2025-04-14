const mongoose = require('mongoose');
const Banca = require('./models/Banca'); 


const MONGO_URI = 'mongodb+srv://danielepereira12:W1k1db2025@cluster0.uso76zg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function padronizarIds() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado ao MongoDB');

    
    const docs = await Banca.find({ _id: { $type: 'int' } });


    if (docs.length === 0) {
      console.log('Nenhum documento com _id numérico encontrado.');
      return;
    }

    for (const doc of docs) {
      
      const novoDoc = new Banca({
        n_edital: doc.n_edital,
        n_processo: doc.n_processo,
        portaria: doc.portaria,
        seção: doc.seção,
        deliberação: doc.deliberação,
        disciplina: doc.disciplina,
        curso: doc.curso,
        banca: doc.banca
      });

      await novoDoc.save(); 
      await Banca.deleteOne({ _id: doc._id }); 
      console.log(`Documento com _id ${doc._id} padronizado.`);
    }

    console.log('✅ Todos os _id numéricos foram padronizados com sucesso!');
  } catch (err) {
    console.error('Erro ao padronizar os _id:', err);
  } finally {
    mongoose.disconnect();
  }
}

padronizarIds();
