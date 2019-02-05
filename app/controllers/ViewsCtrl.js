module.exports.addOneMore = function(application, req, res){
    client = {};

    let nameDatabase = application.config.database.nameDatabase;
    let ObjectId = application.config.database.ObjectId;

    let vacancy = req.body;

    application.config.database.connection().then( conn => {
        client = conn;
        let db = client.db(nameDatabase);

        let vacancyDao = new application.app.models.VacancyDao(db);

        vacancyDao.addView(vacancy, ObjectId).then( result => {
            res.json(result);
            client.close();
        });
    });
}