// Todos os imports para fazer o servidos funcionar
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

// Cria o servidor usando o express
const server = express();

// Conecta ao banco MongoDB usando o mongoose
mongoose.connect('mongodb+srv://admin:admin@cluster0-zy28e.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(express.json());
server.use(cors());
// Utiliza as rotas 'routes.js'
server.use(routes);

// Porta que o servidor vai ouvir (rodar)
server.listen('3333');
