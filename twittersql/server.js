var http = require('http');
var db = require('./models');
var chalk = require('chalk');

db.connect()
  .then(function(conn){
    console.log(chalk.green(`connected to database ${conn.config.database}`));
    var server = http.createServer(require('./app'));
    var port = process.env.PORT || 3000;
    server.listen(port, function(){
      console.log(chalk.green(`server has started on port ${port}`));
    });
  });
