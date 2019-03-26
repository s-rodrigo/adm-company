module.exports = application => {
    application.post('/company/new-vacancy', (req, res) => {
        application.controllers.NewVacancyCtrl.save(application, req, res);
    });
}