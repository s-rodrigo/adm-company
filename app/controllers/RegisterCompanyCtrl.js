module.exports.Register = function(application, req, res){

    let nameDatabase = application.config.database.nameDatabase;
    let client = {};
    let company = req.body;

    company.status = "WAITING_CONFIRM";
    company.observation = [];
    company.dataCreate = new Date();

    let title = 'EMPREGO CAMPINAS - Verificação de email';
    
    application.config.database.connection().then( conn => {
        client = conn;

        let db = client.db(nameDatabase);
        let companyDao = new application.models.CompanyDao(db);

        companyDao.isExist(company).then(value => {
            
            if(value) res.status('400').json({ msg: 'Endereço de email já está sendo utilizado.' });
            else {
                companyDao.register(company).then(result => {
                    
                    let id = result.insertedId;
                    let text = '<p><span><strong>'+company.responsible+'</strong></span><br/><small>'+company.email+'</small><br/><br/>Ainda falta um passo para ativar a sua conta, clique no botão abaixo para confirmar o seu endereço de email:'+
                    '<br/><br/>'+
                    '<a target="_blank" style="background-color: #008403;border: none;color: white;padding: 5px 20px;text-align: center;text-decoration: none;display: inline-block;margin: 4px 2px;border-radius: 6px;cursor: pointer;" href="http://127.0.0.1:3000/#/active-email/'+id+'/now'+'">ATIVAR</a>'+
                    '<br/><br/>Caso o botão não funcione, você pode utilizar o link abaixo:<br/><br/>'+
                    '<a target="_blank" href="http://127.0.0.1:3000/#/active-email/'+id+'/now'+'">http://127.0.0.1:3000/#/active-email/'+id+'/now'+'</a>'
                    +'<br/><br/>Atenciosamente,<br/><strong>Equipe Emprego Campinas.</strong></p><br/><hr/>'+
                    '<small>Obrigado por divulgar suas vagas conosco, juntos somos mais forte!<br/><strong>www.empregocampinas.com.br</strong></small>'+
                    '<style>p {font-family: Arial, Helvetica, sans-serif;font-size: 12px;}span {font-size: 14px;}'+        
                    '</style>';

                    let sendEmail = new application.app.models.SendEmail(company.email, title, text);
                    sendEmail.send();
                    return res.status('200').json({ value: result, msg: 'Cadastrado com sucesso, ative sua conta no email.'});
                });
            }
            
            client.close();
        });
    });

}