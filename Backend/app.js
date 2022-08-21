const express = require('express');
const { sequelize, users, recensions} = require('./models');
const { Server } = require("socket.io");
const cors = require('cors');

const usrRoutes = require('./routes/users');
const prodRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const orderDetRoutes = require('./routes/orderdetails');
const infoRoutes = require('./routes/informations');
const history = require('connect-history-api-fallback');
const http = require('http');


const path = require('path');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();


const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));

app.use('/admin', usrRoutes);
app.use('/admin', prodRoutes);
app.use('/admin', orderRoutes);
app.use('/admin', orderDetRoutes);
app.use('/admin', infoRoutes);


function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}




app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('mainPage.html', { root: './static' });
});


function authSocket(msg, next) {
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}


io.on('connection', socket => {
    //socket.use(authSocket);
    
    socket.on('rec', msg => {
        recensions.create(msg)
            .then( rows => {
                io.emit('rec', JSON.stringify(rows))
            }).catch( err => res.status(500).json(err) );
    });

    socket.on('error', err => socket.emit('error', err.message) );
});

const staticMdl = express.static(path.join(__dirname, 'dist'));

app.use(staticMdl);

app.use(history({ index: '/index.html' }));

app.use(staticMdl);




server.listen({ port: process.env.PORT || 7000 }, async () => {
    await sequelize.authenticate();
    console.log("Server started");
});