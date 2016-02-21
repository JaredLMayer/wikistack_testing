var router = require('express').Router();
var Page = require('../db').models.Page;
var User = require('../db').models.User;

router.delete('/:id', function(req, res, next){
  Page.remove({ _id: req.params.id})
    .then(function(){
      res.redirect('/');
    });
});

router.get('/search', function(req, res, next){
  var tags = req.query.tags.split(',');
  Page.find({
    tags: { $in : tags}
  }).populate('author')
  .then(function(pages){
      res.render('search', { pages: pages, tags: tags, title: `Search`});
     
  });
});
router.get('/add/:id?', function(req, res, next){
  if(req.params.id){
    User.findById(req.params.id)
      .then(function(author){
        res.render('add', { author: author, title: 'Add a Wiki' });
      });
  
  }
  else
    res.render('add', { title: 'Add a Wiki' });
});

router.post('/', function(req, res, next){
  User.findOne({email: req.body.email})
    .then(function(user){
      if(user)
        return user;
      return User.create({
        email: req.body.email,
        name: req.body.name
      });
    })
    .then(function(user){
      return Page.create({
        title: req.body.title,
        content: req.body.content,
        author: user,
        status: req.body.status,
        tags: req.body.tags.split(',')
      });
    })
    .then(function(page){
      res.redirect(page.route);
    })
    .catch(function(error){
      console.log(error);
      res.status(500);
      res.send(error);
    });
});

router.get('/similar/:urlTitle', function(req, res, next){
  var page;
  Page.findOne({ urlTitle: req.params.urlTitle})
    .then(function(_page){
      page = _page;
      return page.findSimilar();
    })
    .then(function(pages){
      res.render('similar', { pages: pages, page: page, title: `Similar Pages`});
    })
    .catch(function(err){
      next(err);
    });
});

router.get('/tag/:tag', function(req, res, next){
  Page.find({ tags: req.params.tag }).populate('author')
    .then(function(pages){
      res.render('byTag', { pages: pages, tag: req.params.tag, title: `Pages by Tag`});
    });
});

router.get('/users/:id', function(req, res, next){
  var author;
  User.findById(req.params.id)
    .then(function(user){
      author = user;
      return Page.find({author : user}).populate('author');
    })
    .then(function(pages){
      res.render('byAuthor', { pages: pages, title: `Pages by Author`, author: author});
    });
});

router.get('/:urlTitle', function(req, res, next){
  console.log(req.params.urlTitle);
  Page.findOne({ urlTitle: req.params.urlTitle})
    .populate('author')
    .then(function(page){
      if(!page)
        return next('page not found');
      res.render('wiki', { page: page, title: page.title });
    });
});

module.exports = router;
