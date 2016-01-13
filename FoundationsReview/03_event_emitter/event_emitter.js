function MyEventEmitter(){
  this.events = {};
}

MyEventEmitter.prototype.addListener = function(name, cb){
  if(this.events[name] === undefined){
    this.events[name] = [cb];
  } else {
    this.events[name].push(cb);
  }
}

MyEventEmitter.prototype.emit = function(name, arg) {
  this.events[name].forEach(function(index){
    index.apply(this, [arg]);
  });
}
