'use strict';
var equal = require('assert').strictEqual;
var promiseToCallback = require('./');

['q', 'bluebird', 'pinkie-promise'].forEach(function (name) {
	var Promise = require(name);
	if (Promise.Promise) {
		Promise = Promise.Promise;
	}

	it(name + ': success', function (done) {
		var success = new Promise(function (resolve) {
			resolve('success');
		});

		promiseToCallback(success)(function (err, data) {
			equal(data, 'success');
			done();
		});
	});

	it(name + ': failure', function (done) {
		var failure = new Promise(function (resolve, reject) {
			reject('failure');
		});

		promiseToCallback(failure)(function (err) {
			equal(err, 'failure');
			done();
		});
	});
});
