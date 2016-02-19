'use strict';

var fs = require('fs');
var Promise = require('bluebird');
var chalk = require('chalk');

var utils = {};

utils.readFile = function (filename, callback, randExtraTime) {
	randExtraTime = randExtraTime || Math.random() * 200;
	setTimeout(function () {
		fs.readFile(filename, function (err, buffer) {
			if (err) callback(err);
			else callback(null, buffer.toString());
		});
	}, randExtraTime);
};

utils.promisifiedReadFile = function (filename, randExtraTime) {
	return new Promise(function (resolve, reject) {
		utils.readFile(filename, function (err, str) {
			if (err) reject(err);
			else resolve(str);
		}, randExtraTime);
	});
};

utils.green = function (text) {
	console.log(chalk.green(text));
};

utils.red = function (text) {
	console.error(chalk.red(text));
};

utils.done = function () {
	console.log(chalk.magenta('--- DONE ---'));
};

module.exports = utils;
