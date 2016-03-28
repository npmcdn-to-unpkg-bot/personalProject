var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = require('../schemas/product.js');
var user = require('./userModel.js');

var orderSchema = Schema({
  user : {type: Schema.Types.ObjectId, ref: 'user', required: true},
  products :
   [{
    item     : {type: String, required: true},
    _id      : {type: Schema.Types.ObjectId, ref: 'product', required: true},
    quantity : {type: Number, min: 1}
  }],
   status: {type: Number, default: 0}
});

module.exports = mongoose.model('Order', orderSchema);
