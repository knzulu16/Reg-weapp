var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storageSchema = new Schema({
  reg_num: String
})

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/Registration";

mongoose.connect(mongoURL, {
  useMongoClient: true
}, function(err) {
  if (err) {
    console.log('error connection');
  } else {
    console.log('database connection success');
  }
});

const number = mongoose.model('dataStorage', storageSchema);

module.exports = number;
