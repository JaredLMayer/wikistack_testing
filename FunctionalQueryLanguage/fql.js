var fs = require('fs');

// _readTable takes a string representing a table name
// and returns an array of objects, namely the rows.
// It does so by looking up actual files, reading them,
// and parsing them from JSON strings into JS objects.
function _readTable (tableName) {
	var folderName = __dirname + '/film-database/' + tableName;
	var fileNames = fs.readdirSync(folderName);
	var fileStrings = fileNames.map(function (fileName) {
		var filePath = folderName + '/' + fileName;
		return fs.readFileSync(filePath).toString();
	});
	var table = fileStrings.map(function (fileStr) {
		return JSON.parse(fileStr);
	});
	return table;
}

function merge (obj1, obj2) {
  var obj = {};
  Object.keys(obj1).forEach(function(key){
    obj[key] = obj1[key];
  });
  Object.keys(obj2).forEach(function(key){
    obj[key] = obj2[key];
  });
  return obj;
}

function FQL (table) {
  this.table = table;
  this.indexes = {};
}

FQL.prototype.exec = function(){
  return this.table;
};

FQL.prototype.count = function(){
  return this.table.length;
};

FQL.prototype.limit = function(n){
  return new FQL(this.table.slice(0, n));
};

FQL.prototype.order = function(col){
  var copy = this.table.slice(0);
  copy.sort(function(a, b){
    if(a[col] < b[col])
      return -1;
    if(a[col] > b[col])
      return 1;
    return 0;
  });
  return new FQL(copy);

}
FQL.prototype.select = function(keys){
  return new FQL(
      this.table.map(function(row){
        return keys.reduce(function(memo, key){
          memo[key] = row[key];
          return memo;
        }, {});
      
      })
  );
};

FQL.prototype.BAKwhere = function(filter){
  var filtered = this.table;
  Object.keys(filter).forEach(function(key){
    var index = this.getIndicesOf(key, filter[key]);
    if(index){
      filtered = index.reduce(function(memo, idx){
        memo.push(filtered[idx]);
        return memo;
      }, []);
      delete filter[key];
    }
  }, this);
  return new FQL(
      filtered.filter(function(row){
        var match = true;
        Object.keys(filter).forEach(function(key){
          if(
              (typeof filter[key] === 'function' && !filter[key](row[key]))
              || 
              (typeof filter[key] !== 'function' && filter[key] !== row[key])
            ){
            match = false;
            return;
          }
        });
        return match;
      })
  );
};

FQL.prototype.left_join = function(right, fn){
  return new FQL(
      this.table.reduce(function(memo, leftRow){
        right.table.forEach(function(rightRow){
          if(fn(leftRow, rightRow))
            memo.push(merge(leftRow, rightRow));
        });
        return memo;
      }, [])
  );
};

FQL.prototype.getIndicesOf = function(col, value){
  if(this.indexes[col])
    return this.indexes[col][value];
};

FQL.prototype.addIndex = function(field){
  this.indexes[field] = this.table.reduce(function(memo, row, index){
    if(!memo[row[field]])
        memo[row[field]] = [];
    memo[row[field]].push(index);
    return memo;
  }, {});
};


module.exports = {
	FQL: FQL,
	merge: merge,
	_readTable: _readTable
};
