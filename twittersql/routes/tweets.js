var router = require('express').Router();
var User = require('../models').models.User;
var Tweet = require('../models').models.Tweet;


router.delete('/:id', function(req, res, next){
  var userId;
  Tweet.findById(req.params.id)
    .then(function(tweet){
      userId = tweet.UserId;
      return tweet.destroy();
    })
    .then(function(){
      res.redirect(`/users/${userId}`);
    })
});


router.post('/', function(req, res, next){
  User.find({where: {name: req.body.name}})
    .then(function(user){
      if(user)
        return user;
      return User.create({name: req.body.name});
    })
    .then(function(user){
      return Tweet.create({ tweet: req.body.tweet, UserId: user.id });
    })
    .then(function(tweet){
      return res.redirect(`/tweets/${tweet.id}`);
    });
});

router.get('/:id', function(req, res, next){
  var backLink = {
    text: 'Back to all users',
    url: '/users'
  };
  Tweet.findById(req.params.id, { include: [ User ]})
    .then(function(tweet){
      var backLink = {
        text: `Back to ${tweet.User.name}`,
        url: '/users'
      };
      res.render('tweet', { backLink: backLink, title: 'Tweet', tweet: tweet, mode: 'Users' });
    });
});

module.exports = router;
