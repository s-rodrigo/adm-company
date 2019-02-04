module.exports.UpdateCompany = function(application, req, res){
    let nameDatabase = application.config.database.nameDatabase;
    let ObjectId = application.config.database.ObjectId;

    let client = {};
    let dataCompany = req.body;

    application.config.database.connection().then(conn => {
        client = conn;

        let db = client.db(nameDatabase);
        let companyDao = new application.app.models.CompanyDao(db);

        companyDao.update(dataCompany, ObjectId).then( result => {
            res.json(result);
        });
    });
}