'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// const router = express.Router();

// Carrega as Rotas
const index = require('../routes/index');
const routes = require('../routes/routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
    
app.use('/', index);
app.use('/api/', routes);

var server = app.listen(2000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("API running on at http://%s:%s", host, port)
})

module.exports = app;