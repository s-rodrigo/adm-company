module.exports = application => {
    application.post('/public/register', (req, res) => {
        application.controllers.RegisterCompanyCtrl.Register(application, req, res);
    });
}