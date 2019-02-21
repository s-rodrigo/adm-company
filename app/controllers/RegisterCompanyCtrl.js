module.exports.Register = function(application, req, res){

    let nameDatabase = application.config.database.nameDatabase;
    let client = {};
    let company = req.body;

    company.dataCreate = new Date();
    
    application.config.database.connection().then( conn => {
        client = conn;

        let db = client.db(nameDatabase);
        let companyDao = new application.app.models.CompanyDao(db);

        companyDao.isExist(company).then(value => {
            
            if(value) res.status('400').json({msg: 'Endereço de email já está sendo utilizado.'});
            else companyDao.register(company).then(result => res.status('200').json({ value: result, msg: 'Cadastrado com sucesso, ative sua conta no email.'}));
            
            client.close();
        });
    });

}