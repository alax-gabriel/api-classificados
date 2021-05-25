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
    image: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        number:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: false
        },
        instagram: {
            type: String,
            required: false
        },
        facebook: {
            type: String,
            required: false
        }
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