function BinarySearchTree(value){
  this.value = value;
  this._size = 1;
  this.left = null;
  this.right = null;
} 

BinarySearchTree.prototype.contains = function(value){
  var found = false;
  function match(_value){
    if(_value === value)
      found = true;
  }
  this.depthFirstForEach(match);
  return found;

}
BinarySearchTree.prototype.insert = function(value){
  this._size++;
  var direction = value < this.value ? 'left' : 'right'; 
  if(!this[direction])
    this[direction] = new BinarySearchTree(value);
  else
    this[direction].insert(value);
}
BinarySearchTree.prototype.size = function(){
  return this._size;

}
BinarySearchTree.prototype.depthFirstForEach = function(fn, mode){
  mode = mode || 'in-order';
  if(mode === 'pre-order')
    fn(this.value);
  if(this.left)
    this.left.depthFirstForEach(fn, mode);
  if(mode === 'in-order')
    fn(this.value);
  if(this.right)
    this.right.depthFirstForEach(fn, mode);
  if(mode === 'post-order')
    fn(this.value);

}
BinarySearchTree.prototype.breadthFirstForEach = function(fn){
  var queue = [this];
  while(queue.length){
    var tree = queue.shift();
    fn(tree.value);
    if(tree.left)
      queue.push(tree.left);
    if(tree.right)
      queue.push(tree.right);
  }

}
