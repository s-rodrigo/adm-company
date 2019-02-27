module.exports = application => {
    application.post('/public/login', (req, res) => {
        console.log(application.controllers);
        console.log(application.models);
        application.controllers.AccessAccountCtrl.Login(application, req, res);
    });
}