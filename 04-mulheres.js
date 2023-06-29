const express = require("express"); // estou iniciando o express
const router = express.Router(); // configurando a primeira parte da rota
// const { v4: uuidv4 } = require("uuid"); - nao vamos usar porque agora temos banco de dados
const cors = require("cors"); // estou trazendo o pacote cors que permite consumir essa api no frontend

const conectaBancoDeDados = require("./06-bancodedados"); // ligando ao arquivo bancoDeDados
conectaBancoDeDados(); // chamando a funcao que conecta o banco de dados

const Mulher = require("./07-mulherModel");

const app = express(); // iniciando o app
app.use(express.json());
app.use(cors());
const porta = 3333; // criando a porta

/* aqui estou criando uma lista inicial de mulheres (antes da base de dados)
const mulheres = [
  {
    id: "1",
    nome: "Bruna Tomas Maiochi",
    imagem:
      "https://media.licdn.com/dms/image/D5603AQEjkFu8OqFOSA/profile-displayphoto-shrink_800_800/0/1686261743266?e=1692230400&v=beta&t=0Tu1WGfuchSozP1_EsW3vOKG4vRWZt7pS3DSOhFIVsY",
    minibio: "Estudante de Desenvolvimento de Software",
  },
  {
    id: "2",
    nome: "Simara Conceição",
    imagem: "https://avatars.githubusercontent.com/u/50921892?v=4",
    minibio: "Instrutora e desenvolvedora de Software",
  },
  {
    id: "3",
    nome: "Iana Chan",
    imagem: "https://bit.ly/3JCXBqP",
    minibio: "CEO & Founder da PrograMaria",
  },
];
*/

// GET
async function mostraMulheres(request, response) {
  try {
    const mulheresVindasDoBancoDeDados = await Mulher.find();
    response.json(mulheresVindasDoBancoDeDados);
  } catch (err) {
    console.log(err);
  }
}

//  POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    // id: uuidv4(),
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao,
  });

  try {
    const mulherCriada = await novaMulher.save();
    response.status(201).json(mulherCriada);
  } catch (err) {
    console.log(err);
  }
}

// PATCH
async function corrigeMulher(request, response) {
  /* function encontraMulher(mulher) {
    if (mulher.id === request.params.id) {
      return mulher;
    }
  }

  const mulherEncontrada = mulheres.find(encontraMulher);
  -> usado tambem antes da base de dados
  */

  try {
    const mulherEncontrada = await Mulher.findById(request.params.id);

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome;
    }

    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem;
    }

    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio;
    }

    if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao;
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();
    response.json(mulheres);
  } catch (err) {
    console.log(err);
  }
}

// DELETE
async function deletaMulher(request, response) {
  /* function todasMenosEla(mulher) {
    if (mulher.id !== request.params.id) return mulher;
  } 
  const mulheresQueFicam = mulheres.filter(todasMenosEla);
  response.json(mulheresQueFicam);
  */

  try {
    await Mulher.findByIdAndDelete(request.params.id);
    response.json({ message: "Mulher deletada com sucesso!" });
  } catch (err) {
    console.log(err);
  }
}

// Porta
function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}

// configuracoes do app
app.use(router.get("/04-mulheres", mostraMulheres)); // configurei rota GET
app.use(router.post("/04-mulheres", criaMulher));
app.use(router.patch("/04-mulheres/:id"), corrigeMulher); // configurei a rota PATCH/04-mulheres/:id
app.use(router.delete("/04-mulheres/:id", deletaMulher));
app.listen(porta, mostraPorta); // servidor ouvindo a porta
