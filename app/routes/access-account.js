module.exports = application => {
    application.post('/public/login', (req, res) => {
        application.app.controllers.AccessAccountCtrl.Login(application, req, res);
    });
}