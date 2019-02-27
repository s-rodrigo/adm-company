module.exports = application => {
    application.post('/company/filter', (req, res) => {
        application.controllers.FilterVacanciesCtrl.filter(application, req, res);
    });
}