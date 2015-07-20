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
	},

	sort : function(points, order, limit, callback) {
		db.sort('users', points, order, limit, function(users){
			var data = {
				users: users
			}

			callback(data);
		})
	},

	addPoints : function(id, amt, callback) {
		keys = { points: amt};

		db.update('users', keys, id, function(users){
			callback(users);
		}); 
	}

}