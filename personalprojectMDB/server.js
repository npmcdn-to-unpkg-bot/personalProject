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

var MainCtrl = require("./controllers/MainCtrl.js");
//var OrderCtrl = require("./controllers/OrderCtrl.js");
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

var port = 4545;

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
    payload = jwt.decode(token, secret, "HS256");
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

//Product Endpoints
app.post('/api/products', ensureAuthenticated, MainCtrl.create);
app.get('/api/products', ensureAuthenticated, MainCtrl.index);
app.get('/api/products/:id', ensureAuthenticated, MainCtrl.show);
app.put('/api/products/:id', ensureAuthenticated, MainCtrl.update);
app.delete('/api/products/:id', ensureAuthenticated, MainCtrl.destroy);

//order Endpoints
//app.post('/api/order/:user_id', OrderCtrl.create);
//app.get('/api/order/', OrderCtrl.index);
//Cart Endpoints
app.post('/api/cart/', ensureAuthenticated, CartCtrl.create);
app.put('/api/cart/', ensureAuthenticated, CartCtrl.update);
app.get('/api/cart/', ensureAuthenticated, CartCtrl.index);
// //User Endpoints
app.get('/api/user', ensureAuthenticated, UserCtrl.index);
app.post('/api/user', ensureAuthenticated, UserCtrl.create);
app.get('api/user', ensureAuthenticated, UserCtrl.getme);
app.post('/auth/login', UserCtrl.show);




app.listen(port, function() {
  console.log('listening to port ', port);
});
