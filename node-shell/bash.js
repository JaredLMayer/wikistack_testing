// parsing - to get our command
// a command runner
// commands
var fs = require('fs');
var commands = require('./commands');
var parser = require('./parser');
var commandList;


function done(result){
  if(commandList.length === 0){
    process.stdout.write(result.toString());
    process.stdout.write('\nprompt > ');
  }
  else
    pipe(result, commandList.shift());
}

function pipe(input, command ){
  command.args.unshift(done);
  command.args.unshift(input);
  if(!commands[command.cmd]){
    commandList = [];
    return done('The command ' + command.cmd + ' is not valid.');
  }
  commands[command.cmd].apply(null, command.args);
}

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  commandList = parser(data.toString().trim());
  pipe(null, commandList.shift());
});



