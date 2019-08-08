// Requires necessários para o arquivo
const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

// Cria o caminho para as rotas
const routes = express.Router();

routes.get('/devs', DevController.index);

// Cria a rota e especifíca o tipo da requisição como POST
routes.post('/devs', DevController.store);

// Cria a rota com uma varíavel de parâmetro
routes.post('/devs/:devId/likes', LikeController.store);

// Cria a rota com uma varíavel de parâmetro
routes.post('/devs/:devId/dislikes', DislikeController.store);

// Exporta as rotas para serem utilizadas em outros arquivos
module.exports = routes;