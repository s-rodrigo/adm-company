module.exports.filter = function(application, req, res){
    let nameDatabase = application.config.database.nameDatabase;
    let client = {};

    let page = req.params.page;
    let query = req.body;

    application.config.database.connection().then( conn => {
        client = conn;
        let db = client.db(nameDatabase);

        let vacancyDao = new application.app.models.VacancyDao(db);

        vacancyDao.filter(page).then( result => {
            res.json(result);
            client.close();
        });
    });

}