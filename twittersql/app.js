var express = require('express');
var path = require('path');
var swig = require('swig');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
swig.setDefaults({cache: false});


var app = express();

app.use('/vendor', express.static( path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


app.get('/', function(req, res, next){
  res.render('index', { title: 'Home', mode: 'Home' });
});

app.use('/users', require('./routes/users.js'));
app.use('/tweets', require('./routes/tweets.js'));

module.exports = app;
