var mongoose = require('mongoose');
var cart     = require('./cartSchema.js');
//"var orders = require('./order.js');
var Schema = mongoose.Schema;



var userSchema = new Schema({
    firstName  : {type: String, required: true},
    lastName   : {type: String, required: true},
    email      : {type: String, required: true, unique: true, index: true},
    password   : {type: String, required: true},
    type       : {type: String, required: true},
    cart       : [cart],
    orders     : [],
  });

module.exports = mongoose.model('User', userSchema);
