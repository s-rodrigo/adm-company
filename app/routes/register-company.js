module.exports = application => {
    application.post('/company/register', (req, res) => {
        application.app.controllers.RegisterCompanyCtrl.Register(application, req, res);
    });
}