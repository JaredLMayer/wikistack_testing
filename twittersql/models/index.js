var Sequelize = require('sequelize');

var db = new Sequelize('sqlite:twitterjs.db');

var User = db.define('User', {
  name: Sequelize.STRING
}, { timestamps: false}); 

var Tweet = db.define('Tweet', {
  tweet: Sequelize.STRING
}, { timestamps: false}); 

User.hasMany(Tweet);
Tweet.belongsTo(User);

var _conn;

module.exports = {
  connect: function(){
    if(_conn)
      return _conn;
    _conn = db.authenticate().then(function(){
      return db;
    });
    return _conn;
  
  },
  models: {
    User: User,
    Tweet: Tweet
  }
};
