var mssql = require('seriate');
var config = require('../config/config_mssql.js');
mssql.setDefaultConfig(config);

module.exports = {
  index: function(req, res) {
    mssql.execute({
      query: "SELECT TOP 1000 [ITEMNO], [DESC], [CATEGORY] FROM [MYTSQL].[dbo].[ICITEM] WHERE [ALLOWONWEB] = 1"
    }).then(function(results) {
      res.json(results);
    }, function(err) {
      console.log("Something bad happened:", err);
    });
  }
}
