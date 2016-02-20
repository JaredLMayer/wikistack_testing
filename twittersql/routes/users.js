var router = require('express').Router();
var User = require('../models').models.User;
var Tweet = require('../models').models.Tweet;

router.get('/', function(req, res, next){
  User.findAll({ include: [ Tweet ]})
    .then(function(users){
      res.render('users', { title: 'Users', users: users, mode: 'Users' });
    });
});

router.get('/:id', function(req, res, next){
  var backLink = {
    text: 'Back to all users',
    url: '/users'
  };
  User.findById(req.params.id, { include: [ Tweet ]})
    .then(function(user){
      res.render('user', { backLink: backLink, title: user.name, user: user, mode: 'Users' });
    });
});

module.exports = router;
