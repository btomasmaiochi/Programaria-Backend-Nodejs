const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

function mostraOla(request, response) {
  response.send("Olá mundo! :)");
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}

app.use(router.get("/02-ola", mostraOla));
app.listen(porta, mostraPorta);

// http://localhost:3333/02-ola
