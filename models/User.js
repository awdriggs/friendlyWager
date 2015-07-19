var db = require('../db.js');

module.exports.User = {
	all : function(table, callback) {
		db.all(table, function(users){
			var data = {
				users: users
			}

			callback(data);
		});
	},

	create : function(table, object, callback) {
		db.create(table, object, function(users){
			var data = {
				users: users
			}

			callback(data);
		});
	}


	// add leader board options
}