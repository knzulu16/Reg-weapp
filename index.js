"use strict"

var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var Regnumbers=[];
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.render('index.text.handlebars');
});

app.post('/reg_number', function(req, res){
  var reg_number=req.body.reg_num;
  var TownReg=req.body.Registration;
  Regnumbers.push(reg_number);



  res.render('index.text.handlebars',{
    regnumbers:Regnumbers

  });

});




// app.get('/', function(req, res){
//     res.send("Here it is:CA 456");
// });
//
//
//
// app.get('/reg_number/:num', function(req, res){
//   console.log(req.params.num);
//   res.send("you sent me : " + req.params.num);
// });
///
//start the server
var port = process.env.PORT || 3000;

var server = app.listen(port, function () {

 var host = server.address().address;
 var port = server.address().port;

 console.log('Example app listening at http://%s:%s', host, port);

});
