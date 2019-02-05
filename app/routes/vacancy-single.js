module.exports = application => {
    application.get('/company/vacancy/:id', (req, res) => {
        application.app.controllers.VacancySingleCtrl.GetVacancy(application, req, res);
    });
}