var sqlite3 = require('sqlite3');
var path = require('path');
var chalk = require('chalk');
var _db;
module.exports = {
  connect: function(cb){
    var filePath = path.join(__dirname, 'imdb.db');
    new sqlite3.Database(filePath, function(_err){
      _db = this;
      cb(_err, this);
    });
  },
  query : function(sql, params, cb){
    _db.all(sql, params, function(err, results){
      if(results){
        console.log('**** results ****');
        console.log(results);
        console.log('**** results ****');
      }
      else
        console.log(chalk.red(err));

      cb(err, results);
    
    });
  }
};
