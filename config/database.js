const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const user = 'rodrigogsantos';
const password = '021209Fe';
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
    nameDatabase: dbName
  }
}