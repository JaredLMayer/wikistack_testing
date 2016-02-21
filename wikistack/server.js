var db = require('./db');
var http = require('http');
var chalk = require('chalk');



db.connect()
  .then(function(conn){
    console.log(chalk.green(`database connected`));
    var port = process.env.PORT || 3000;

    http.createServer(require('./app')).listen(port, function(){
      console.log(chalk.green(`server listening on ${port}`));
    });

  
  })
  .catch(function(ex){
    console.log(chalk.red(ex));
  });
