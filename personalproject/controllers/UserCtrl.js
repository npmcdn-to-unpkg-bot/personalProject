var mysql = require('mysql');
var pool = require('../config/config.js');

module.exports = {
  index: function(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        res.json({
          "code": 100,
          "status": "Error in connection database"
        });
        return;
      }
      connection.query("select username, email, status from user", function(err, rows) {
        connection.release();
        if (!err) {
          res.json(rows);
        }
      });
      connection.on('error', function(err) {
        res.json({
          "code": 100,
          "status": "Error in connection database"
        });
        return;
      });
    })
  },
  update: function(req, res) {
    var post = req.body;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        res.json({
          "code": 100,
          "status": "Error in connection database"
        });
        return;
      }
      connection.query('INSERT INTO user SET ?', post, function(err, result) {
        connection.release();
        if (!err) {
          res.json(result);
        }
      });
      connection.on('error', function(err) {
        connection.release();
        res.json({
          "code": 100,
          "status": "Error in connection database"
        });
        return;
      });
    });
  }
}
