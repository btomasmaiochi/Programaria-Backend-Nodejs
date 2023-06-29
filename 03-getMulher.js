const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

// JSON - forma de enviar pela internet varias informacoes
function mostraMulher(request, response) {
  response.json({
    nome: "Bruna Tomas Maiochi",
    imagem:
      "https://media.licdn.com/dms/image/D5603AQEjkFu8OqFOSA/profile-displayphoto-shrink_800_800/0/1686261743266?e=1692230400&v=beta&t=0Tu1WGfuchSozP1_EsW3vOKG4vRWZt7pS3DSOhFIVsY",
    minibio: "Estudante de Desenvolvimento de Software",
  });
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}

app.use(router.get("/03-getMulher", mostraMulher));
app.listen(porta, mostraPorta);
