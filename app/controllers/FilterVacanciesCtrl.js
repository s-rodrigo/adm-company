module.exports.filter = function(application, req, res){
    let nameDatabase = application.config.database.nameDatabase;
    let client = {};

    let query = req.body;
    //console.log(query);
    application.config.database.connection().then( conn => {
        client = conn;
        let db = client.db(nameDatabase);

        let vacancyDao = new application.app.models.VacancyDao(db);

        vacancyDao.filter(query).then(result => {
            if(query.size) res.json({size: query.size, data: result});
            else vacancyDao.countCollection(query).then(count => res.json({size: count, data: result}));
            client.close();
        });
    });
}