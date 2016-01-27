module.exports = parser;

function parser(text){
  var commandStrings = text.split('|');
  var commands = commandStrings.map(function(commandString){
    commandString = commandString.trim();
    var parts = commandString.split(' ');
    return {
      cmd : parts[0],
      args : parts.slice(1)
    }; 
  });
  return commands;
}

