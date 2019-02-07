module.exports.Login = function(application, req, res){

    let JWT = application.config.jwt;
    let nameDatabase = application.config.database.nameDatabase;
    let client = {};
    let company = req.body;

    JWT.validation(req).then(auth => {
        if(!auth.success) return res.status('401').json({auth: null, token: null, msg: auth.message});
        
        application.config.database.connection().then( conn => {
            client = conn;
    
            let db = client.db(nameDatabase);
            let companyDao = new application.app.models.CompanyDao(db);
    
            if(!company.email || !company.password) return res.status('401').json({auth: null, token: null, msg: 'Email e senha são obrigatórios.'});
    
            companyDao.access(company).then(value => {
                if(!value) return res.status('401').json({auth: null, token: null, msg: 'Email ou senha inválidos'});
                else {
                    if(value.status == 'WAITING_CONFIRM') return res.status('401').json({auth: null, token: null, msg: 'Conta aguardando ativação no email.'});
    
                    if(value.status == 'BLOCK') return res.status('401').json({auth: null, token: null, msg: 'Conta suspensa, em caso de dúvidas entrar em contato.'});
    
                    if(value.status == 'ATIVE') {
                        
                        let token = JWT.jwt.sign({ id: value.id }, process.env.SECRET, {expiresIn: 300});
    
                        return res.status('200').json({auth: value, token: token, msg: 'Acesso realizado com sucesso.'});
                    }
                }
                
                client.close();
            });
        });
    });
    
}