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

VacancyDao.prototype.filter = function(pagination){
    let page = pagination - 1;

    let options = {};
    options.limit = 10;
    options.skip = page == 0 ? page : ( page * options.limit);
    //"sort": "title"

    return new Promise((resolve, reject) => {
        
        this._connection.find({}, options)
                    .toArray((err, result) => {
                        
                if(err) reject(err);
                resolve(result);
        });
    });
}

VacancyDao.prototype.addView = function(vacancy, ObjectId){

    return new Promise((resolve, reject) => {
        this._connection.updateOne({_id: ObjectId(vacancy.id)}, {$inc: {views: 1}}, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

module.exports = function(){
    return VacancyDao;
};