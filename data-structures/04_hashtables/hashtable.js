function HashTable(){
  this.numBuckets = 25;
  this._memory = [];
}

HashTable.prototype.set = function(key, value){
  if(typeof key !== 'string')
    throw new TypeError('Keys must be strings');
  var hash = this.hash(key);
  var list = this._memory[hash];
  if(!list)
    list = this._memory[hash] = new LinkedList();
  var keyValuePair = this._getKeyValuePair(key, hash);
  if(keyValuePair)
    keyValuePair.value = value;
  else
    list.addToTail({ key: key, value: value});
};

HashTable.prototype.get = function(key){
  var keyValuePair = this._getKeyValuePair(key);
  if(!keyValuePair)
    return;
  return keyValuePair.value;
};

HashTable.prototype._getKeyValuePair = function(key, hash){
  hash = hash || this.hash(key);
  var list = this._memory[hash];
  if(!list)
    return;
  return list.search(function(kvp){
    return kvp.key === key;
  });
};
HashTable.prototype.hasKey = function(key){
  return !!this._getKeyValuePair(key);
};
HashTable.prototype.hash = function(str){
  var sum = 0;
  for(var i = 0; i < str.length; i++)
    sum += str.charCodeAt(i);
  return sum % this.numBuckets;
};
