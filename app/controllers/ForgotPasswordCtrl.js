module.exports.ChangePassword = function(application, req, res){
    let nameDatabase = application.config.database.nameDatabase;
    let client = {};
    let company = req.body;

    company.dataCreate = new Date();
    
    application.config.database.connection().then( conn => {
        client = conn;

        let db = client.db(nameDatabase);
        let companyDao = new application.app.models.CompanyDao(db);

        companyDao.isExist(company).then(value => {
            
            if(value._id) res.json({ result: value, msg: 'Instruções para mudança de senha, foram enviadas ao email informado'});
            else res.json({ result: value, msg: 'Email informado não consta na base de dados.'});
            
            client.close();
        });
    });
}