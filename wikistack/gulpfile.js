'use strict';
var db = require('./db');
var Page = db.models.Page;
var User = db.models.User;
var Promise = require('bluebird');
var chalk = require('chalk');

var gulp = require('gulp');

gulp.task('seed', function(){
  db.connect()
    .then(function(){
      return Promise.all([Page.remove({}), User.remove({})]);
    })
    .then(function(){
      return User.create([
          { name: 'Professor', email: 'ericpkatz@gmail.com' },
          { name: 'John Doe', email: 'john@gmail.com' }
      ]);
    })
    .then(function(users){
      var prof = users[0];
      var john = users[1];
      return Page.create([
          {title: 'Why I Love Mongo', author: prof, content: 'Mongo mongo mongo', tags: ['databases', 'mongo']},
          {title: 'Sequelize Is Great', author: prof, content: 'SQL SQL SQL', tags: ['databases', 'sql', 'foo']},
          {title: 'How Template Strings Work', author: prof, content: 'Here is how template strings work', tags: ['JavaScript','ES6']},
          {title: 'Destructuring', author: john, content: 'Here is how destructuring  works', tags: ['Functions', 'JavaScript','ES6']},
          {title: 'Where Does Foo Come From', author: john, content: 'Foo comes from ...', tags: ['foo']},
      ]);
    })
    .then(function(pages){
      return Page.find({ tags: 'foo' });
    })
    .then(function(fooPages){
      console.log('***foo***');
      fooPages.forEach(function(page){
        console.log(page.title, page.tags);
      });
    })
    .then(function(pages){
      return Page.find({ tags: { $in: ['foo', 'sql', 'ES6']} });
    })
    .then(function(fooPages){
      console.log('***[foo, sql,ES6]***');
      fooPages.forEach(function(page){
        console.log(page.title, page.tags);
      });
    })
    .then(function(){
      return db.disconnect();
    })
    .then(function(){
      console.log('disconnected');
    })
    .catch(function(ex){
      console.log(chalk.red(ex));
    });

});


