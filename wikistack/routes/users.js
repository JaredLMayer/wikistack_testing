var router = require('express').Router();
var User = require('../db').models.User;
var Page = require('../db').models.Page;
var Promise = require('bluebird');

router.get('/', function(req, res, next){

  var aggregator = new Promise(function(resolve, reject){
    Page.aggregate({
      $group: {
        _id: '$author',
        count: { $sum: 1 }
      }
    }).exec(function(err, results){
      if(err)
        return reject(err);
      resolve(results);
    });
  });

  Promise.all([aggregator, User.find()])
      .spread(function(agg, users){
        var map = agg.reduce(function(memo, item){
          memo[item._id] = item.count;
          return memo;
        }, {});
        res.render('users', { users: users, title: 'Users', map: map });
      });
});


module.exports = router;
