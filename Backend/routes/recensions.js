const express = require('express');
const { sequelize,recensions} = require('../models');


const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));




route.post('/vratiRecenzije', (req, res) => {
    recensions.findAll({ where: { productId: req.body.id }})
        .then( rec => res.json(rec))
        .catch( err => res.status(500).json(err) );
});

route.post('/vratiRecenzijeUser', (req, res) => {
    recensions.findAll({ where: { userId: req.body.id }})
        .then( rec => res.json(rec))
        .catch( err => res.status(500).json(err) );
});

route.post('/dodajRecenziju', (req, res) => {

    console.log(req.body);

    recensions.create(req.body).then( rows => {
       
         res.status(200).json("True");
 
     }).catch( err => res.status(500).json("Neuspesno dodavanje recenzije!") );
 });



module.exports = route;