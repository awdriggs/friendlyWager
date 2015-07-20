var db = require('../db.js');

module.exports.Wager = {
	create: function(data, callback) {
		db.create('wagers', data, function(wagers) {
			callback();
		});
	}
}