var fs = require('fs');
var commands = {
  echo: function(input, done){
    var args = Array.prototype.slice.call(arguments, 2);
    var text = args.join(' ');
    done(text);
  },
  grep: function(input, done, search){
    var regex = new RegExp(search, 'g');
    done(search.match(regex));
  },
  cat: function(input, done, file){
    if(input)
      return done(input);
    fs.readFile(file, 'utf8', function(err, data){
      if(!err)
        done(data);
    });
  },
  head: function(input, done, file){
    function process(data){
      var lines = data.split('\n').slice(0, 5).join('\n'); 
      return lines;
    }

    if(input)
      return done(process(input));
    fs.readFile(file, 'utf8', function(err, data){
      if(!err)
        done(process(data));
    });
  },
  tail: function(input, done, file){
    function process(data){
      var lines = data.split('\n').slice(-5).join('\n'); 
      return lines;
    }

    if(input)
      return done(process(input));
    fs.readFile(file, 'utf8', function(err, data){
      if(!err)
        done(process(data));
    });
  }
};
module.exports = commands;
