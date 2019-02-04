module.exports = application => {
    application.post('/company/change-data', (req, res) => {
        application.app.controllers.ChangeDataCtrl.UpdateCompany(application, req, res);
    });
}