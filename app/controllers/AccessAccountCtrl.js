let JWT = require('jsonwebtoken');

module.exports.Login = function(application, req, res){
    console.log('controller');
    let nameDatabase = application.config.database.nameDatabase;
    let client = {};
    let company = req.body;
    
    application.config.database.connection().then( conn => {
        client = conn;

        let db = client.db(nameDatabase);
        let companyDao = new application.app.models.CompanyDao(db);

        if(!company.email || !company.password) return res.status('401').json({auth: null, token: null, msg: 'Email e senha são obrigatórios.'});

        expiresIn = { expiresIn: 300 };

        if(company.keepOn) expiresIn = {};
        else expiresIn = { expiresIn: 300 };

        companyDao.access(company).then(value => {
            if(!value) return res.status('401').json({auth: null, token: null, msg: 'Email ou senha inválidos'});
            else {
                if(value.status == 'WAITING_CONFIRM') return res.status('401').json({auth: null, token: null, msg: 'Conta aguardando ativação no email.'});

                if(value.status == 'BLOCK') return res.status('401').json({auth: null, token: null, msg: 'Conta suspensa, em caso de dúvidas entrar em contato.'});

                if(value.status == 'ACTIVE') {
                    
                    let token = JWT.sign({ id: value.id }, process.env.SECRET, expiresIn);

                    return res.status('200').json({auth: value, token: token, msg: 'Acesso realizado com sucesso.'});
                }
            }
            
            client.close();
        });
    });
    
}