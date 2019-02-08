//Import dependencies
let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');

//Setting variables
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {

    let requestOrigin = req.originalUrl.split('/');
    if(requestOrigin[1] === 'public') return next();
    
    const token = req.headers['x-access-token'];
    if (!token) return res.json({ success: false, message: 'Nenhum token encotrado.' })

    jwt.verify(token, process.env.SECRET, function(err, decoded) {      
        if (err) return res.json({ success: false, message: 'Falha ao autenticar o token.', error: err });    
        next();
    });
});

//Initialize consign
consign().include('./app/routes')
         .then('./app/controllers')
         .then('./app/models')
         .then('./config/database.js')
         .into(app);

module.exports = app;
