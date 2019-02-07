let jwt = require('jsonwebtoken');

let verify = function(req){
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET, function(err, decoded) {      
                if (err) resolve({ success: false, message: 'Falha ao tentar autenticar o token!' });    
                else  resolve({ success: true, message: decoded}); 
            });
        });
}

module.exports = function(){
    return {
        jwt: jwt,
        validation: verify
    }
}