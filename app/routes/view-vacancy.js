module.exports = application => {
    application.put('/company/views', (req, res) => {
        application.app.controllers.ViewsCtrl.addOneMore(application, req, res);
    });
}