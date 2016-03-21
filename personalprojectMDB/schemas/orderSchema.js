var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = require('./schemas/product.js');

var orderSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  products: [{
    item: productSchema,
    quantity: {type: Number, required: true, min 1}
  }],
  ordered: {type: Date, default: newDate()}
});

module.exports = orderSchema;
