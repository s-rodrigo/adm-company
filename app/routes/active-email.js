module.exports = application => {
    application.get('/public/active-email/:id/now', (req, res) => {
        application.app.controllers.ActiveEmailCtrl.confirm(application, req, res);
    });
}