var db = require('../db.js');

module.exports.wager = {
	create: function(data, callback) {
		db.create('wagers', data, function(wagers) {
			callback();
		});
	}
}