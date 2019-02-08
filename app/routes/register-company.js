module.exports = application => {
    application.post('/public/register', (req, res) => {
        application.app.controllers.RegisterCompanyCtrl.Register(application, req, res);
    });
}