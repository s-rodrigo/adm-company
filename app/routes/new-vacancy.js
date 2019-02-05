module.exports = application => {
    application.post('/company/new-vacancy', (req, res) => {
        application.app.controllers.NewVacancyCtrl.save(application, req, res);
    });
}