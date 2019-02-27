module.exports = application => {
    application.post('/public/login', (req, res) => {
        console.log('route');
        console.log(application);
        application.app.controllers.AccessAccountCtrl.Login(application, req, res);
    });
}