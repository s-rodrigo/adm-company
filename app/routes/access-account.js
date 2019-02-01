module.exports = application => {
    application.post('/company/login', (req, res) => {
        application.app.controllers.AccessAccountCtrl.Login(application, req, res);
    });
}