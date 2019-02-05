function VacancyDao(connection){
    this._connection = connection.collection('vacancy');
}

VacancyDao.prototype.save = function(vacancy){
    return new Promise((resolve, reject) => {
        this._connection.insertOne(vacancy, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

VacancyDao.prototype.getOne = function(id, ObjectId){
    return new Promise((resolve, reject) => {
        this._connection.findOne({_id: ObjectId(id)}, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

VacancyDao.prototype.filter = function(){

    let options = {
        "limit": 20,
        "skip": 10
        //"sort": "title"
    }

    return new Promise((resolve, reject) => {
        
        this._connection.find({}, options)
                    .toArray((err, result) => {
                        
                if(err) reject(err);
                resolve(result);
        });
    });
}

module.exports = function(){
    return VacancyDao;
};