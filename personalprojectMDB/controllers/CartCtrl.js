var Cart = require("../schemas/cartSchema.js");
var User = require("../schemas/userModel.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
   create: function(req, res, next){

     User.findByIdAndUpdate(req.params.user_id, {$push: {cart: req.body}}, function(err, response){
       if(err) {
         res.status(500).json(err);
       } else {
         res.json(response);
       }
     });

  },
  update: function(req, res, next) {

    User.findById(req.params.user_id, function(err, resp) {
      if (err) {
        res.status(500).send(err)
      }
      var myUser = resp;
      var qty = req.query.qty / 1;
      var foundItem = -1;
      myUser.cart.forEach(function(cartItem, index) {
        if (cartItem._id.toString() === req.query.itmId) {
          foundItem = index
        }
      })
      if (foundItem >= 0) {
        if (qty === 0) {
          myUser.cart.splice(foundItem, 1);
        } else {
          myUser.cart[foundItem].qty = qty
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

  }
};
