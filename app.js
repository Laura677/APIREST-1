const express = require("express"); // Importa o Express para criar o servidor
const app = express();
const bodyParser = require("body-parser"); // Importa o body-parser para ler dados enviados pelo cliente
const Usuarios = require("./models/Usuarios"); // Importa o model Usuarios (tabela do banco)

app.use(bodyParser.urlencoded({ extended: false })); // Permite ler dados de formulários HTML
app.use(bodyParser.json()); // Permite ler dados enviados em JSON

// POST /usuarios → criar um novo usuário
app.post("/usuarios", (req, res) => {
    Usuarios.create({
        nome: req.body.nome, // Nome enviado pelo cliente
        email: req.body.email // Email enviado pelo cliente
    })
    .then(() => res.status(201).send("Usuário cadastrado com sucesso!")) // Mensagem de sucesso
    .catch((erro) => res.status(500).send("Erro ao cadastrar usuário: " + erro)); // Mensagem de erro
});

// GET /usuarios → listar todos os usuários ou filtrar por nome/email com query params
app.get("/usuarios", (req, res) => {
    const { nome, email } = req.query; 
    let filtro = {};
    if (nome) filtro.nome = nome;
    if (email) filtro.email = email;

    Usuarios.findAll({ where: filtro })
        .then((usuarios) => {
            if (usuarios.length === 0) return res.status(404).send("Nenhum usuário encontrado"); 
            res.send(usuarios); // Retorna os usuários encontrados
        })
        .catch((erro) => res.status(500).send("Erro ao buscar usuários: " + erro));
});

// GET /usuarios/:id → buscar usuário pelo ID
app.get("/usuarios/:id", (req, res) => {
    Usuarios.findByPk(req.params.id)
        .then((usuario) => {
            if (!usuario) return res.status(404).send("Usuário não encontrado");
            res.send(usuario); // Retorna o usuário encontrado
        })
        .catch((erro) => res.status(500).send("Erro ao buscar usuário: " + erro));
});

// PATCH /usuarios/:id → atualizar usuário pelo ID
app.patch("/usuarios/:id", (req, res) => {
    Usuarios.update(
        { nome: req.body.nome, email: req.body.email }, // Campos a atualizar
        { where: { id: req.params.id } } // Condição para atualizar
    )
    .then(([linhasAtualizadas]) => {
        if (linhasAtualizadas === 0) return res.status(404).send("Usuário não encontrado");
        res.send("Usuário atualizado com sucesso"); // Mensagem de sucesso
    })
    .catch((erro) => res.status(500).send("Erro ao atualizar usuário: " + erro)); // Mensagem de erro
});

// DELETE /usuarios/:id → deletar usuário pelo ID
app.delete("/usuarios/:id", (req,res) => {
    Usuarios.destroy({ where: { id: req.params.id } })
        .then((linhasDeletadas) => {
            if (linhasDeletadas === 0) return res.status(404).send("Usuário não encontrado");
            res.send("Usuário deletado com sucesso"); // Mensagem de sucesso
        })
        .catch((erro) => res.status(500).send("Erro ao deletar usuário: " + erro)); // Mensagem de erro
});

const PORT = process.env.PORT || 3000;
// Inicia o servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log("Servidor está ativo na porta " + PORT);
});
