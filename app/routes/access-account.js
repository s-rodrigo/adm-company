module.exports = application => {
    application.post('/public/login', (req, res) => {
        console.log('route');
        console.log(application.controllers);
        application.controllers.AccessAccountCtrl.Login(application, req, res);
    });
}