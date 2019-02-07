//Import dependencies
let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');

//Setting variables
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Initialize consign
consign().include('./app/routes')
         .then('./app/controllers')
         .then('./app/models')
         .then('./config/database.js')
         .then('./config/jwt.js')
         .into(app);

module.exports = app;
