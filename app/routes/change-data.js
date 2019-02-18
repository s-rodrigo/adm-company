module.exports = application => {
    application.post('/company/change-data/:id', (req, res) => {
        application.app.controllers.ChangeDataCtrl.UpdateCompany(application, req, res);
    });
}