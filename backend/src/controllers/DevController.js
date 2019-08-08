// Requires necessários, axios é utilizado para a API fazer requests http
const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

    async index(req, res) {
        // Puxa o nome do usuário informado no header da requisição
        const { user } = req.headers;

        // Checa se o usuário fornecido já existe 
        const loggedDev = await Dev.findById(user);

        // Filtros para a listagem
        const users = await Dev.find({
            // Iterador and = $and
            $and: [
                // Listagem not equal = $ne
                { _id: { $ne: user } },
                // Listagem not in = $nin
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ],
        })
        // Retorna a listagem de usuários com os filtros usados
        return res.json(users);
    },

    async store(req, res) {
        // Pega a variável username do corpo da requisição
        const { username } = req.body; 
        // Checa se já existe um usuário com aquele nome antes de tentar criar um novo no banco
        const userExists = await Dev.findOne({ user: username});

        if (userExists) {
            return res.json(userExists);
        }

        // Realiza o get e obtém os dados do usuário informado
        const response = await axios.get(`https://api.github.com/users/${username}`);

        // Pega as seguintes variáveis da resposta da requisição
        const { name, bio, avatar_url: avatar } = response.data;

        // Cria o usuário a partir das informações fornecidas
        // Função await faz com que o servidor espera até que a requisição seja completa para continuar a executar o resto do código
        // Isso faz com que o código espere a função, fazendo com que não a função não cuntinua com dados incompletos
        const dev = await Dev.create({ 
            name,
            user: username,
            bio,
            avatar
         })

        // Retorna os dados usados na criação do usuário
        return res.json(dev);
    }
};