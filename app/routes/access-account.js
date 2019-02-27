module.exports = application => {
    application.post('/public/login', (req, res) => {
        application.controllers.AccessAccountCtrl.Login(application, req, res);
    });
}