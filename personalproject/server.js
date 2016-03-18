var express = require('express');
// var pool = require('./config/config.js');
var config = require('./config/config_mssql.js');
var app = express();
var port = 3000;
// var mysql = require('mysql');
var mssql = require('seriate');
var bodyParser = require('body-parser');
var userCtrl = require('./controllers/userCtrl.js');
var ProductCtrl = require('./controllers/ProductCtrl.js');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


// MSSQL EndPoints
app.get("/api/product", ProductCtrl.index);
//MYSQL Endpoints
app.get("/api/users", userCtrl.index);
app.post("/api/users", userCtrl.update);

app.listen(port, function() {
  console.log('listening to port ', port);
});
