module.exports = application => {
    application.post('/company/contact', (req, res) => {
        application.app.controllers.ContactCtrl.contact(application, req, res);
    });
}