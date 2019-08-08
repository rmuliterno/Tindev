// Import no mongoose que é utilizado para realizar alterações no BD usando sintaxe JS
const { Schema, model } = require('mongoose');

// Schema para os dados do banco
const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        // Referencia a tabela de Devs (ao todo)
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
    // Função direta do mongoose que já pega a data de criação e alteração dos dados
    timestamps: true,
});

// Exporta o schema
module.exports = model('Dev', DevSchema);