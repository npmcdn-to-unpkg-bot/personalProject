var path = require('path');
var qs = require('querystring');
var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var colors = require('colors');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var mongoose = require('mongoose');
var request = require('request');
var shortid = require('shortid');

var MainCtrl = require("./controllers/MainCtrl.js");
var OrderCtrl = require("./controllers/OrderCtrl.js");
var CartCtrl = require("./controllers/CartCtrl.js");
var UserCtrl = require("./controllers/UserCtrl.js");
var Product = require("./schemas/product.js");
var jwt = require("jwt-simple");
var secret = require("./config/config.js")


mongoose.connect('mongodb://localhost/mytrex');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors({exposedHeaders: "nt"}));
mongoose.connection.once("open", function(){
  console.log("Connected to MongoDB");
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://192.168.0.127");
  next();
});

var port = 3000;

function updateJWT(payload) {
    payload.exp = moment().add(30, 'm').unix();
    return jwt.encode(payload, secret);
}

function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, secret, false, "HS256");
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix() || ((moment().format('X') - payload.iat)/60) > 1440) {
    return res.status(401).send({ message: 'Token has expired' });
  }

  req.type = payload.type;
  req.user = payload.sub;
  res.setHeader("nt", updateJWT(payload));
  next();
}

function ensureAuthenticatedAdmin(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, secret, false, "HS256");
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix() || ((moment().format('X') - payload.iat)/60) > 1440) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  if(payload.role !== 'admin'){
    return res.status(401).send({ message: 'User not authorized'})
  }
  req.type = payload.type;
  req.user = payload.sub;
  res.setHeader("nt", updateJWT(payload));
  next();
}


//Product Endpoints
app.post('/api/products', ensureAuthenticated, MainCtrl.create);
app.get('/api/products', ensureAuthenticated, MainCtrl.index);
app.get('/api/products/:id', ensureAuthenticated, MainCtrl.show);
app.put('/api/products/:id', ensureAuthenticated, MainCtrl.update);
app.delete('/api/products/:id', ensureAuthenticated, MainCtrl.destroy);

//order Endpoints
app.post('/api/order/', ensureAuthenticated, OrderCtrl.create);
app.get('/api/order/', ensureAuthenticated, OrderCtrl.index);
app.get('/api/orders/', ensureAuthenticated, OrderCtrl.all);//All orders by Admin
//Cart Endpoints
app.post('/api/cart/', ensureAuthenticated, CartCtrl.create);
app.put('/api/cart/', ensureAuthenticated, CartCtrl.update);
app.get('/api/cart/', ensureAuthenticated, CartCtrl.index);
app.delete('/api/cart/:id', ensureAuthenticated, CartCtrl.destroy);
// //User Endpoints
app.get('/api/user', ensureAuthenticated, UserCtrl.index);
app.post('/api/user', ensureAuthenticatedAdmin, UserCtrl.create);
app.post('/api/userId', ensureAuthenticated, UserCtrl.getme);
app.post('/auth/login', UserCtrl.show);
app.post('/api/userD', ensureAuthenticatedAdmin, UserCtrl.destroy);
app.get('/api/role', ensureAuthenticated, UserCtrl.getRole);

app.all('/*', function(req, res, next) {
   res.sendFile('index.html', { root: __dirname + '/public' });
});


app.listen(port, function() {
  console.log('listening to port ', port);
});
