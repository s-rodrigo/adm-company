module.exports.save = function(application, req, res){
    let nameDatabase = application.config.database.nameDatabase;
    let client = {};

    let vacancy = req.body;

    application.config.connection().then( conn => {

        client = conn;
        let db = client(nameDatabase);
        let vacancyDao = application.app.models.VacancyDao(db);

        vacancyDao.save(vacancy).then(result => {
            res.json(result);
        });
    });

}