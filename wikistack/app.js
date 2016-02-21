var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var swig = require('swig');
swig.setDefaults({cache: false});
var Page = require('./db').models.Page;




var app = express();
module.exports = app;

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use( methodOverride('_method'));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');


app.get('/', function(req, res, next){
  Page.find().populate('author')
    .then(function(pages){
      res.render('index', { pages: pages, title: 'wikistack' });
    });
});

app.use('/wiki', require('./routes/wikis'));
app.use('/users', require('./routes/users'));

app.use(function(err, req, res, next){
  console.log(err);
  res.sendStatus(500);
});
