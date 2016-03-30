var User = require("../schemas/userModel.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var jwt = require('jwt-simple');
var moment = require('moment');

var secret = require("../config/config.js")

function createJWT(user) {
  var payload = {
    sub: user._id,
    role: user.type,
    iat: moment().unix(),
    exp: moment().add(30, 'm').unix()
  };
  return jwt.encode(payload, secret);
}

module.exports = {
  create: function(req, res, next) {
    var user = new User(req.body);
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        user.save(function(err, s) {
          if (err) {
            return res.status(404).send({ message: 'Invalid email and/or password' });
          } else {
            return err ? res.status(404).json(err) : res.json(s);
          }
        });
      });
    })
  },
  index: function(req, res, next) {
    User.find(req.query, function(err, response) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(response);
      }
    });
  },
  show: function(req, res) {
  User.findOne({ "email": req.body.email }, function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email and/or password' });
      }
        res.send({ token: createJWT(user) });
      });
    });
  },
  getme: function(req, res) {
    User.findOne(req.body, function(err, user) {
      res.send(user);
    });
  },
  destroy: function(req, res) {
    User.findByIdAndRemove(req.body, function(err, user) {
      res.status(200).json(user)
    });
  }
}
