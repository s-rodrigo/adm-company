module.exports = application => {
    application.post('/company/filter/:page', (req, res) => {
        application.app.controllers.FilterVacanciesCtrl.filter(application, req, res);
    });
}