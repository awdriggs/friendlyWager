var db = require('../db.js');

module.exports.user = {
    //this is only used for testing, maybe remove before release
    all: function(table, callback) {
        db.all(table, function(users) {
            var data = {
                users: users
            }

            callback(data);
        });
    },

    //make a new users
    create: function(table, object, callback) {
        db.create(table, object, function(users) {
            var data = {
                users: users
            }

            callback(data);
        });
    },

    //used for leaderobard
    sort: function(points, order, limit, callback) {
        db.sort('users', points, order, limit, function(users) {
            var data = {
                users: users
            }

            callback(data);
        })
    },

    //currently not working, write the code that is psuedod in the comment
    addPoints: function(id, amt, callback) {
        keys = {
            points: amt
        };
        //find the current points for the user, add 1 to points, then update
        db.update('users', keys, id, function(users) {
            callback(users);
        });
    },

    findUser: function(username, callback) {
        db.findWithCompare('users', 'username', username, function(user) {
            callback(user[0]);
        });
    },

    findUserById: function(id, callback) {
        db.findWithCompare('users', 'id', id, function(user) {
            callback(user[0]);
        });
    },

    //grabs all the content created by a single user
    singleUser: function(id, callback) {
    	db.singleUser(id, function(data) {
    		callback(data);
    	});
    },

    //update user profile?
    update: function(obj, id, callback) {
        db.update('users', obj, id, function(data) {
            callback(data);
        });
    }

    //delete user profile?

}