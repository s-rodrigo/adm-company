module.exports = application => {
    application.put('/public/views', (req, res) => {
        application.app.controllers.ViewsCtrl.addOneMore(application, req, res);
    });
}