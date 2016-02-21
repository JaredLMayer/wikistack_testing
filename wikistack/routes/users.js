var router = require('express').Router();
var User = require('../db').models.User;
var Page = require('../db').models.Page;

router.get('/', function(req, res, next){
  Page.aggregate({
    $group: {
      _id: '$author',
      count: { $sum: 1 }
    }
  })
  .exec(function(err, results){
    var map = results.reduce(function(memo, item){
      memo[item._id] = item.count;
      return memo;
    }, {});
    User.find()
      .then(function(users){
        res.render('users', { users: users, title: 'Users', map: map });
      });
  });
});


module.exports = router;
