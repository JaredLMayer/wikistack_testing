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
	var merged = {};
	for (var k in obj1) {
		merged[k] = obj1[k];
	}
	for (var k in obj2) {
		merged[k] = obj2[k];
	}
	return merged;
}

function FQL (table) {
	this.table = table;
	this.indexTables = {};
}

FQL.prototype.exec = function () {
	return this.table;
};

FQL.prototype.count = function () {
	return this.exec().length;
};

FQL.prototype.limit = function (amount) {
	var limited = this.exec().slice(0, amount);
	return new FQL(limited);
};

// // without indexing
// FQL.prototype.where = function (criteria) {
// 	var filtered = this.exec().filter(function (row) {
// 		return Object.keys(criteria).every(function (k) {
// 			var criteriaValue = criteria[k];
// 			if (typeof criteriaValue == 'function') {
// 				return criteriaValue(row[k]);
// 			} else {
// 				return row[k] == criteriaValue;
// 			}
// 		});
// 	});
// 	return new FQL(filtered);
// };

// with indexing
FQL.prototype.where = function (criteria) {
	var self = this;
	var filtered = Object.keys(criteria).reduce(function (result, k) {
		var indices = self.getIndicesOf(k, criteria[k]);
		if (indices) {
			return indices.map(function (index) {
				return result[index];
			});
		} else {
			return result.filter(function (row) {
				if (typeof criteria[k] == 'function') {
					return criteria[k](row[k]);
				} else {
					return criteria[k] == row[k];
				}
			});
		}
	}, this.exec());
	return new FQL(filtered);
};

FQL.prototype.select = function (columnNames) {
	var selected = this.exec().map(function (row) {
		var newRow = {};
		columnNames.forEach(function (name) {
			newRow[name] = row[name];
		});
		return newRow;
	});
	return new FQL(selected);
};

FQL.prototype.order = function (columnName) {
	var ordered = this.exec().sort(function (rowA, rowB) {
		return rowA[columnName] - rowB[columnName];
	});
	return new FQL(ordered);
};

FQL.prototype.left_join = function (foreignFql, rowMatcher) {
	var joined = [];
	this.exec().forEach(function (row) {
		foreignFql.exec().forEach(function (foreignRow) {
			if (rowMatcher(row, foreignRow)) {
				joined.push(merge(row, foreignRow));
			}
		});
	});
	return new FQL(joined);
};

FQL.prototype.addIndex = function (columnName) {
	var indexTable = {};
	this.exec().forEach(function (row, index) {
		var value = row[columnName];
		indexTable[value] = indexTable[value] || [];
		indexTable[value].push(index);
	});
	this.indexTables[columnName] = indexTable;
};

FQL.prototype.getIndicesOf = function (columnName, value) {
	if (this.indexTables[columnName]) {
		return this.indexTables[columnName][value];
	}
};

module.exports = {
	FQL: FQL,
	merge: merge,
	_readTable: _readTable
};