module.exports.save = function(application, req, res){
    let nameDatabase = application.config.database.nameDatabase;
    let client = {};

    let vacancy = req.body;

    application.config.database.connection().then( conn => {
        client = conn;
        let db = client.db(nameDatabase);
        let vacancyDao = new application.models.VacancyDao(db);

        vacancyDao.save(vacancy).then(result => {
            res.json(result);
            client.close();
        });
    });

}