function SendMail(email, title, text){
    this._nodemailer = require('nodemailer');
    this._user = 'rodrigo.gsantos93@gmail.com';
    this._password = '743530rosa'; 
    this._email = email;

    this._title = title;
    this._text = text;

    this._transporter = this._nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: this._user,
            pass: this._password
        }
    });
    
    this._mailOptions = {
        from: this._user,
        to: this._email,
        subject: this._title,
        html: this._text
    };
}


SendMail.prototype.send = function(callback){
    return this._transporter.sendMail(this._mailOptions, function(error, info){
        if (error) throw error;
        else return info;
    });
}

module.exports = function(){
    return SendMail;
}