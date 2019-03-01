module.exports = application => {
    application.get('/public/active-email/:id/now', (req, res) => {
        console.log(application.controllers);
        application.controllers.ActiveEmailCtrl.confirm(application, req, res);
    });
}