var mongoose = require('mongoose');
var cart     = require('./cartSchema.js');
// var order = require('./orderSchema.js');
var Schema = mongoose.Schema;



var userSchema = new Schema({
    firstName  : {type: String, required: true},
    lastName   : {type: String, required: true},
    email      : {type: String, required: true, unique: true, index: true, lowercase: true},
    password   : {type: String, required: true},
    type       : {type: String, required: true},
    cart       : [cart],
    orders     : [],
  });

  function popu(next){
        this.populate('cart._id');
        next();
  }

  userSchema
        .pre('find', popu)
        .pre('findOne', popu);

module.exports = mongoose.model('User', userSchema);
