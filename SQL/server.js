var http = require('http');
var db = require('./db');

db.connect(function(err, _conn){
  http.createServer(require('./app'))
    .listen(process.env.PORT);
});

