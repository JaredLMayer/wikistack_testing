function Queue(){
  this._memory = [];
  this._startIndex = 0;
  this._endIndex = 0;
}

Queue.prototype.enqueue = function(value){
  this._memory[this._endIndex++] = value;
};
Queue.prototype.dequeue = function(){
  if(this.size() === 0)
    return;
  return this._memory[this._startIndex++];
};
Queue.prototype.size = function(){
  return this._endIndex - this._startIndex;
};
