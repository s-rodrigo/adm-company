function CompanyDao(connection){
    this._connection = connection.collection('company');
}

CompanyDao.prototype.register = function(company){

    return new Promise((resolve, reject) => {
        this._connection.insertOne(company, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

CompanyDao.prototype.isExist = function(company){

    let query = {
        email: {
            $regex: '^'+company.email+'$',
            $options: 'i'
        }
    }

    return new Promise((resolve, reject) => {
        this._connection.findOne(query, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

CompanyDao.prototype.access = function(company){

    let query = {
        $and: [
            {
                email: {
                $regex: '^'+company.email+'$',
                $options: 'i'
                }
            },
            {
                password: {
                $regex: '^'+company.password+'$',
                $options: 'i'
                }
            },
        ]
    }
    
    return new Promise((resolve, reject) => {
        this._connection.findOne(query, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

module.exports = function(){
    return CompanyDao;
}