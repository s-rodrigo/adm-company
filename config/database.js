const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
 
// Connection URL
const user = 'adminrod';
const password = '110893rod';
const url = 'mongodb://'+user+':'+password+'@ds047440.mlab.com:47440/company-jobs';
 
// Database Name
const dbName = 'company-jobs';
 
let connection = () => {
  return new Promise((resolve, reject) => {

    MongoClient.connect(url, {useNewUrlParser : true}, (err, client) => {
      if(err) reject(err);
      
      console.log("Connected successfully to server");
      return resolve(client);
    });
  });
}

module.exports = function(){
  return database = {
    connection: connection,
    nameDatabase: dbName,
    ObjectId: ObjectId
  }
}