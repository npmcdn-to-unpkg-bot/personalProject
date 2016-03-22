var express = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");
var MainCtrl = require("./controllers/MainCtrl.js");
//var OrderCtrl = require("./controllers/OrderCtrl.js");
var CartCtrl = require("./controllers/CartCtrl.js");
var UserCtrl = require("./controllers/UserCtrl.js");
var mongoose = require('mongoose');
var Product = require("./schemas/product.js");
var jwt = require("jwt-simple");
var qs = require("moment");
var request = require("request");

mongoose.connect('mongodb://localhost/mytrex');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());
mongoose.connection.once("open", function(){
  console.log("Connected to MongoDB");
});

var port = 4545;

//Product Endpoints
app.post('/api/products', MainCtrl.create);
app.get('/api/products', MainCtrl.index);
app.get('/api/products/:id', MainCtrl.show);
app.put('/api/products/:id', MainCtrl.update);
app.delete('/api/products/:id', MainCtrl.destroy);

//order Endpoints
//app.post('/api/order/:user_id', OrderCtrl.create);
//app.get('/api/order/', OrderCtrl.index);
//Cart Endpoints
// app.post('/api/cart/:user_id', CartCtrl.create);
// app.put('/api/cart/:user_id', CartCtrl.update);
// //User Endpoints
app.get('/api/user', UserCtrl.index);
app.post('/api/user', UserCtrl.create);
app.post('/api/user/id', UserCtrl.show);




app.listen(port, function() {
  console.log('listening to port ', port);
});
