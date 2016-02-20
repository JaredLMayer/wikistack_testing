var gulp = require('gulp');
var db = require('./models');


gulp.task('foo', function(){
  console.log('bar');
});

gulp.task('server', ['seed'], function(){
  console.log('no I am ready');

});

gulp.task('seed', function(){
  return db.connect()
    .then(function(conn){
      return conn.sync({force: true});
    })
    .then(function(){
      return db.models.User.create({ name: 'Professor' });
    })
    .then(function(user){
      return db.models.Tweet.create({ UserId: user.id, tweet: 'hello' });
    })
    .then(function(){
      return db.models.User.find({ include: [ db.models.Tweet ]});
    })
    .then(function(user){
      console.log(user.Tweets[0].tweet);
    });
});
