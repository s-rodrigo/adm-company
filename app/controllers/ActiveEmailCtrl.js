module.exports.confirm = (application, req, res) => {
    let nameDatabase = application.config.database.nameDatabase;
    let ObjectId = application.config.database.ObjectId;

    let client = {};
    let userId = req.params.id;
    let update = {status: "ACTIVE"};

    application.config.database.connection().then(conn => {
        client = conn;

        let db = client.db(nameDatabase);
        let companyDao = new application.app.models.CompanyDao(db);

        companyDao.update(userId, update, ObjectId).then( result => {
            res.json(result);
            client.close();
        });
    });
}