//var mongojs = require("mongojs");
//var db = mongojs("ecommerce");
//var collection = db.collection("products");
//var ObjectId = mongojs.ObjectId;
var Product = require("../schemas/product.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



module.exports = {
   create: function(req, res, next) {
     Product.create(req.body, function(error, response){
    if(error) {
      return res.status(500).json(error);
    } else {
      return res.json(response);
    }
  });
  //console.log("made it here");
  },

  index: function(req, res, next) {
    Product.find(req.query, function(err, response){
      if(err) {
        res.status(500).json(err);
      } else {
        res.json(response);
      }
    });
  },

  show: function(req, res, next) {
    Product.findById(req.params.id, function(err, response){
      if(err) {
        res.status(500).json(err);
      } else {
        res.json(response);
      }
    });
  },

  update: function(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, req.body, function(error, response){
      if(error) {
        return res.status(500).json(error);
      } else {
        return res.json(response);
      }
    });
  },

  destroy: function(req, res, next) {
    Product.findByIdAndRemove(req.params.id, function(error, response){
      if(error) {
        return res.status(500).json(error);
      } else {
        return res.json(response);
      }
    });
  }
};
