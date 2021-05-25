const mongoose = require('mongoose');

const Anuncio = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

mongoose.model('anuncio', Anuncio);