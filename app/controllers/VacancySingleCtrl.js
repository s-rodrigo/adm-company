module.exports.GetVacancy = function(application, req, res){
    let id = req.params.id;

    let client = {};
    let nameDatabase = application.config.database.nameDatabase;
    let ObjectId = application.config.database.ObjectId;

    application.config.database.connection().then( conn => {
        client = conn;
        let db = client.db(nameDatabase);

        let vacancyDao = new application.app.models.VacancyDao(db);

        vacancyDao.getOne(id, ObjectId).then( result => {
            res.json(result);
            client.close();
        });
    });
}