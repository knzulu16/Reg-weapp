"use strict"
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: false
}))
var models = require('./models');
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  }
}));
// parse application/json
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

var Regnumbers = [];
var regObj = {};

function storeData(regParam, cb) {

  // if the reg number does not exist(undefined) in the object (regObj = {});
  // push to the array (Regnumbers = []) and store to the object

  // else do not store the reg number

  if (regObj[regParam] === undefined) {
    Regnumbers.push(regParam);
    regObj[regParam] = 1;
    models.create({
      reg_num: regParam
    }, function(err, result) {
      if (err) {
        cb(null, {
          err
        });
      } else {
        cb(null, {
          result
        });
      }
    });
  } else {
    cb(null, {
      regParam
    });
  }
}
app.get('/', function(req, res) {
  res.render('index.handlebars');
});

app.get('/', function(req, res) {

  res.redirect('index.handlebars');
});

app.post('/reg_number', function(req, res) {
  var reg_number = req.body.reg_num;
  var TownReg = req.body.Registration;

  storeData(reg_number, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.render('index', {
        regnumbers: Regnumbers
      });
    }
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
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err.stack)
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('web app started on port:' + port);
});
