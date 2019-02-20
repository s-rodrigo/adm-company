module.exports.contact = function(application, req, res){

    let email = req.body;
    console.log(email);
    res.status('200').json(email);
}