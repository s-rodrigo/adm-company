module.exports = application => {
    application.post('/company/filter', (req, res) => {
        application.app.controllers.FilterVacanciesCtrl.filter(application, req, res);
    });
}