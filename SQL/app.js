var express = require('express');
var db = require('./db');
var swig = require('swig');
var path = require('path');
swig.setDefaults({cache: false});


var app = express();
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res, next){
  res.render('index', { mode: 'home', title: 'Welcome to IMDB Lite'});
});

app.get('/movies/by_genre', function(req, res, next){
  db.movieMapGenres(function(err, results){
    res.render('index', { title: 'Movies By Genre', map: results, url: '/movies/by_genre', mode : 'genre'});
  });
});

app.get('/movies/by_year', function(req, res, next){
  db.movieMapYears(function(err, results){
    res.render('index', { title: 'Movies By Year', map: results, url: '/movies/by_year', mode : 'year'});
  });
});

app.get('/movies/by_year/:year', function(req, res, next){
  db.moviesByYear(req.params.year, function(err, results){
    res.render('index', { title: 'Movies By Year : ' + req.params.year, movies: results, mode: 'year', backUrl : '/movies/by_year' });
  });
});

app.get('/movies/by_genre/:genre', function(req, res, next){
  db.moviesByGenre(req.params.genre, function(err, results){
    res.render('index', { title: 'Movies By Genre : ' + req.params.genre, movies: results, mode: 'genre', backUrl : '/movies/by_genre' });
  });
});


module.exports = app;

