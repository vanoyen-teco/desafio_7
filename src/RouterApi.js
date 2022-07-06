const express = require('express');
const router = express.Router();
const Controlador = require('./Controller');

const errorHandler = (err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({ error: err.message });
};

router.use(express.raw());
router.use(express.json());
router.use(express.urlencoded({extended:true})); 

router.get('/',(req, res)=>{
    res.render("home", {
        pageTitle: "Entregable Nº 7",
        scripts : [{ script: '/socket.io/socket.io.js'}, { script: './handlebars.js'}, { script: './home.js'}]
    });
});

module.exports = {
    router,
    errorHandler,
    Controlador 
};