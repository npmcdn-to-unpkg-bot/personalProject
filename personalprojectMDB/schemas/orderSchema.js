var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = require('../schemas/product.js');
var user = require('./userModel.js');
var shortid = require('shortid');

var orderSchema = Schema({
  _id: {
    type: String,
    unique: true,
    'default': shortid.generate
  },
  user : {type: Schema.Types.ObjectId, ref: 'user', required: true},
  products :
   [{
    item     : {type: String, required: true},
    _id      : {type: Schema.Types.ObjectId, ref: 'product', required: true},
    quantity : {type: Number, min: 1}
  }],
   status: {
        type: String,
        default: 'Received',
        enum: [
          'Received',
          'In Process',
          'Shipped',
        ]},
  tracking: {type: String, default: 'NA'}

}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);
