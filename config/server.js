//Import dependencies
let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let cors = require('cors');

//Setting variables
let app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
    let requestOrigin = req.originalUrl.split('/');
    if(requestOrigin[1] === 'public') return next();
    
    const token = req.headers.authorization;
    
    if (!token) return res.status('401').json({ success: false, message: 'Nenhum token encotrado.' })

    jwt.verify(token, process.env.SECRET, function(err, decoded) {      
        if (err) return res.status('401').json({ success: false, message: 'Falha ao autenticar o token.', error: err });    
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
