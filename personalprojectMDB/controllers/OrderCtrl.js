var Cart = require("../schemas/cartSchema.js");
var User = require("../schemas/userModel.js");
var Order = require("../schemas/orderSchema.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function saveUser(userToSave, req, res) {
  userToSave.save(function(err, result) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(result)
    }
  })
};

module.exports = {

  create: function(req, res, next) {
    User.findById(req.user, function(err, user) {
      if (err) {
        res.status(500).json(err);
      }

      var orderObj = {
        products: [],
        user: user._id
      }
      for(var i = 0; i < user.cart.length; i++){
        orderObj.products.push(user.cart[i])
      }
      new Order(orderObj).save(function(err, savedOrder){
        if(err){
          res.status(500).send(err)
        }
        else{
          user.orders.push(savedOrder);
          user.cart = [];
        }
        user.save(function(err, savedUser) {
          err ? res.status(500).send(err) : res.send(savedUser);
        })
      });
    })
  },
  index: function(req, res, next) {
    User.findById(req.user, function(err, myUser) {
      if (err) {
        res.status(500).json(err);
      }
      var foundItem = -1;
      //console.log(myUser);
      myUser.orders.forEach(function(orderItem, index) {
          foundItem ++
      })
      if (foundItem === -1) {
        res.status(204).send("No available orders");
      }
      else if(foundItem !== -1){
        res.status(200).send(myUser.orders);
      }
    })
  }
};
