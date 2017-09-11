var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storageSchema = new Schema({
  reg_num: String
})

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/Registration";

mongoose.connection.on("error", function(err){
  console.log(err);
});

mongoose.connect(mongoURL, {
  useMongoClient: true
}, function(err) {
  if (err) {
    console.log('error connection');
  } else {
    console.log('database connection suoccess');
  }
});

const dataStorage = mongoose.model('dataStorage', storageSchema);

module.exports = dataStorage;

//
// // how i did ma schema
//
// var regSchema=new mongoose.Schema({
//   reg_num:String
// });
// var model=mongoose.model('dataStorage');
// module.exports=model;
//
//
// dataStorage.save(function(err){
//   console.log('data saved');
// if(err){
//   console.log(erro);
// }
// });
