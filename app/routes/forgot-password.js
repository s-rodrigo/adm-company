module.exports = application => {
    application.post('/public/forgot-password', (req, res) => {
        application.app.controllers.ForgotPasswordCtrl.ChangePassword(application, req, res);
    })
}