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

VacancyDao.prototype.filter = function(query){
    let filter = {};
    let options = {};
    let page = query.page - 1;

    options.limit = 10;
    options.skip = page == 0 ? page : ( page * options.limit);

    return new Promise((resolve, reject) => {
        
        this._connection.find( filter, options)
                    .toArray((err, result) => {
                        
                if(err) reject(err);
                resolve(result);
        });
    });
}

VacancyDao.prototype.countCollection = function(query){
    let filter = {};
    if(query.filter != '') filter = { title: { $regex: '.*'+ query.filter +'.*', $options: 'i'}};

    return new Promise((resolve, reject) => {
        
        resolve(this._connection.find(filter).count());
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