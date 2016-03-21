var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = require('./product.js');

var cartSchema = new Schema({
      item     : {type: Schema.Types.ObjectId, ref: 'product', required: true},
      quantity : {type: Number, min: 1}
});

module.exports = cartSchema;
