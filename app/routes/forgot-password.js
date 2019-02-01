module.exports = application => {
    application.post('/company/forgot-password', (req, res) => {
        application.app.controllers.ForgotPasswordCtrl.ChangePassword(application, req, res);
    })
}