const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("./models/Anuncio");
const Anuncio = mongoose.model('anuncio');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
});

mongoose.connect('mongodb://localhost/classificados', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((error) => {
    console.log("Falha na conelxão com o MongoDB!");
});

app.use(express.json());

app.get("/", (req, res) => {

    Anuncio.find({}).then((anuncio) => {
        return res.json(anuncio);
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum anúncio encontrado!"
        })
    })
});

app.get("/anuncio/:anuncioId", (req, res) => {
    Anuncio.findOne({_id: req.params.anuncioId}).then((anuncio) => {
        return res.json(anuncio);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Anúncio não encontrado!"
        })
    })
});

app.post("/cadastro-de-anuncio", (req, res) => {
    const anuncio = Anuncio.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Anúncio não cadastrado!"
        })
        
        return res.status(200).json({
            error: false,
            message: "Anúncio cadastrado com sucesso!"
        })
    })
});

app.put("/editar-anuncio/:anuncioId", (req, res) => {
    const anuncio = Anuncio.updateOne({_id: req.params.anuncioId}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Anúncio não editado!"
        });
        return res.json({
            error: false,
            message: "Anúncio editado com sucesso!"
        })
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});