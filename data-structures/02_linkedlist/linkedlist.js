function LinkedList(){
  this.head = null;
  this.tail = null;

}

LinkedList.prototype.addToTail = function(value){
  var node = new Node(value);

  node.previous = this.tail;
  if(this.tail)
    this.tail.next = node;
  this.tail = node;
  if(!this.head)
    this.head = this.tail;

};
LinkedList.prototype.addToHead = function(value){
  var node = new Node(value);
  node.next = this.head;
  if(this.head)
    this.head.previous = node;
  this.head = node;
  if(!this.tail)
    this.tail = this.head;
};
LinkedList.prototype.removeTail = function(){
  if(!this.tail)
    return;
  var toReturn = this.tail.value;
  this.tail = this.tail.previous;
  if(this.tail)
    this.tail.next = null;
  else
    this.head = null;
  return toReturn;
};

LinkedList.prototype.removeHead = function(){
  if(!this.head)
    return;
  var toReturn = this.head.value;
  this.head = this.head.next;
  if(this.head)
    this.head.previous = null;
  else
    this.tail = null;
  return toReturn;
};

LinkedList.prototype.search = function(value){
  var current = this.head;
  while(current){
    if(( typeof value === 'function' && value(current.value)) 
        || current.value == value)
      return current.value;
    current = current.next;
  }
  return null;

};

function Node(value){
  this.value = value;
  this.previous = null;
  this.next = null;
}
