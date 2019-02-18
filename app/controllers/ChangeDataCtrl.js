module.exports.UpdateCompany = function(application, req, res){
    let nameDatabase = application.config.database.nameDatabase;
    let ObjectId = application.config.database.ObjectId;

    let client = {};
    let userId = req.params.id;
    let dataCompany = req.body;
    let update = {};

    if(dataCompany.type == 'PASSWORD') update.password = dataCompany.newPassword;

    application.config.database.connection().then(conn => {
        client = conn;

        let db = client.db(nameDatabase);
        let companyDao = new application.app.models.CompanyDao(db);

        if(dataCompany.type == 'PASSWORD'){
            companyDao.access(dataCompany).then(exist => {
                if(exist){
                    companyDao.update(userId, update, ObjectId).then( result => {
                        client.close();
                        exist.password = update.password;
                        res.status('200').json(exist);
                    });
                } else res.status('400').json({msg: 'Senha inválida.'});
            });
        }
        if(dataCompany.type == 'INFORMATIONS') {
            companyDao.update(userId, update, ObjectId).then( result => {
                res.json(result);
                client.close();
            });
        }
    });
}