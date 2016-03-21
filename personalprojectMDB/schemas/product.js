var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
   ITEMNO : {type: String, unique: true, required: true, index: true},
   DESC : {type: String, required: true},
   type : {type: String, required: true},
   image: {type: String, required: false, uniqure: false}

});

module.exports = mongoose.model("product", productSchema);
