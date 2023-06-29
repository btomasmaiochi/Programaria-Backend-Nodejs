const mongoose = require("mongoose");
require("dotenv").config();

async function conectaBancoDeDados() {
  try {
    console.log("Conexaso com o banco de dados iniciou");

    await mongoose.connect(process.env.MONGO_URL);
    console.log("Conexao com o banco de dados feita com sucesso!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = conectaBancoDeDados;
