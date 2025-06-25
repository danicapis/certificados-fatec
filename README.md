#certificados-fatec
Projeto backend desenvolvido em estágio voluntário na FATEC Zona Leste, como parte da automatização do ambiente Wiki institucional. Gera certificados oficiais em PDF para membros de bancas examinadoras de concursos públicos.

# Gerador de Certificados de Banca — Fatec Zona Leste

Sistema backend desenvolvido em **Node.js + Express** para geração de certificados em **PDF** de participação em bancas examinadoras de concursos públicos. Utiliza um **modelo oficial em PDF**, preenchido automaticamente com dados vindos do **MongoDB Atlas**.


📚 Sobre o Projeto

Este projeto foi desenvolvido como parte de um **estágio voluntário** realizado na **FATEC Zona Leste**, integrando o processo de modernização e automação do **ambiente Wiki institucional**.

O objetivo principal é facilitar a emissão de certificados oficiais de participação para professores que compõem bancas examinadoras de concursos, garantindo agilidade e padronização no processo.


✨ Funcionalidades

- Conexão com MongoDB Atlas
- Leitura de dados da banca examinadora
- Preenchimento automático de um modelo de certificado oficial em PDF
- Visualização e download direto do certificado gerado 
  
✅ Tecnologias utilizadas

- **Node.js** — ambiente backend
- **Express** — framework de servidor
- **Mongoose** — integração com MongoDB
- **Dotenv** — variáveis de ambiente
- **PDF-lib** — manipulação de arquivos PDF


🚀 Como rodar o projeto

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/certificados-backend.git
cd certificados-backend

2. Instale as dependências

npm init -y
npm install express mongoose dotenv ejs pdf-lib

3. Crie o arquivo .env

PORT=3000
MONGO_URI=sua_uri_do_mongodb

> Não envie esse arquivo ao GitHub — ele está no .gitignore.



4. Adicione o modelo PDF

Crie a pasta assets/ e coloque dentro o arquivo:

Modelo de cert.pdf

> O nome deve estar exatamente assim.



5. Inicie o servidor

node server.js


---

🌐 Acesso à geração de certificados

Com o servidor rodando, acesse no navegador:

http://localhost:3000/certificado/pdf/ID_DO_DOCUMENTO

Substitua ID_DO_DOCUMENTO pelo _id de um documento real da coleção bancas.


---

📁 Estrutura do Projeto

certificados-backend/
├── assets/
│ └── Modelo de cert.pdf
├── models/
│ └── Banca.js
├── routes/
│ └── certificado.js
├── templates/ ← opcional (para HTML com ejs)
│ └── certificado.ejs
├── .env ← não sobe pro Git
├── .gitignore ← ignora .env e node_modules
├── package.json
├── server.js
└── README.md


---

🛡️ Segurança

O projeto ignora arquivos sensíveis como .env

Sua URI do MongoDB nunca deve ser exposta publicamente



---

✍️ Autoria

Projeto desenvolvido por:

Daniele Capistrano Pereira
Curso: Desenvolvimento de Software Multiplataforma
FATEC Zona Leste — 2025
Projeto parte do ambiente Wiki da instituição, desenvolvido em estágio voluntário.


---

❤️ Licença

Este projeto é de uso educacional e interno. Adaptações e reutilizações são permitidas com os devidos créditos.



