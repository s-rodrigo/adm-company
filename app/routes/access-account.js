module.exports = application => {
    application.post('/public/login', (req, res) => {
        console.log('route');
        application.app.controllers.AccessAccountCtrl.Login(application, req, res);
    });
}