module.exports.Login = function(application, req, res){

    let nameDatabase = application.config.database.nameDatabase;
    let client = {};
    let company = req.body;

    company.dataCreate = new Date();
    
    application.config.database.connection().then( conn => {
        client = conn;

        let db = client.db(nameDatabase);
        let companyDao = new application.app.models.CompanyDao(db);

        companyDao.access(company).then(value => {
            console.log(value);
            if(!value._id) res.json({msg: 'Email ou senha inválidos.'});
            else {
                if(value.status == 'WAITING_CONFIRM') return res.json({result: value, msg: 'Conta aguardando ativação no email.'});
                if(value.status == 'BLOCK') return res.json({result: value, msg: 'Conta suspensa, entre em contato conosco.'});
                if(value.status == 'ATIVE') return res.json({result: value, msg: 'Login realizado com sucesso.'});
            }
            
            client.close();
        });
    });
}