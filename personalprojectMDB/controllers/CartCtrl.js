var Cart = require("../schemas/cartSchema.js");
var User = require("../schemas/userModel.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
  create: function(req, res, next) {
    User.findById(req.user, function(err, resp) {
      if (err) {
        res.status(500).json(err);
      }
      var myUser = resp;
      var item = req.body._id;
      var qty = req.body.quantity / 1;
      var foundItem = -1;
      myUser.cart.forEach(function(cartItem, index) {
        if (cartItem._id.toString() === req.body._id.toString()) {
          foundItem = index;
        }
      })
      if (foundItem >= 0) {
        myUser.cart[foundItem].quantity += parseInt(qty);
      } else {
        myUser.cart.push(req.body);
      }

      myUser.save(function(err, result) {
        err ? res.status(500).send(err) : res.send(result);
      })
    });
  },

  update: function(req, res, next) {

    User.findById(req.user, function(err, resp) {
      if (err) {
        res.status(500).send(err)
      }
      var myUser = resp;
      var qty = req.body.quantity / 1;
      var foundItem = -1;
      //console.log(myUser);
      myUser.cart.forEach(function(cartItem, index) {
        if (cartItem._id.toString() === req.body._id) {
          foundItem = index;
        }
      })
      if (foundItem >= 0) {
        if (qty === 0) {
          myUser.cart.splice(foundItem, 1);
        } else {
          myUser.cart[foundItem].quantity = parseInt(qty);
        }
      }
      saveUser(myUser, req, res);
    })

    function saveUser(userToSave, req, res) {
      userToSave.save(function(err, result) {
        if (err) {
          res.status(500).send(err)
        } else {
          res.send(result)
        }
      })
    };
  },

  index: function(req, res, next){
    User.findById(req.user, function(err, resp){
      if(err){
        res.status(500).send(err);
      }
      var myUser = resp;
      res.send(myUser.cart);
    })
  }
};
