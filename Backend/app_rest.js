const express = require('express');
const { sequelize, Users, Products,Orders,Orderdetails,Informations, Recensions} = require('./models');

const cors = require('cors');
const users = require('./routes/users');
const products = require('./routes/products');
const orders = require('./routes/orders');
const orderdetails = require('./routes/orderdetails');
const informations = require('./routes/informations');
const recensions = require('./routes/recensions');


require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/users', users);
app.use('/products', products);
app.use('/orders', orders);
app.use('/orderdetails', orderdetails);
app.use('/informations', informations);
app.use('/recensions', recensions);



app.listen({ port: process.env.PORT || 8020 }, async () => {
    await sequelize.authenticate();
    console.log("Server rest started");
});