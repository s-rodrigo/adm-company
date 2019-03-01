module.exports = application => {
    application.post('/public/register', (req, res) => {
        console.log(application.controllers);
        application.controllers.RegisterCompanyCtrl.Register(application, req, res);
    });
}