var db = require('../db.js');

module.exports.comment = {
    create: function(data, callback) {
        db.create('comments', data, function(comments) {
            callback();
        });
    },

    update: function(obj, id, callback) {
    	db.update('comments', obj, id, function(comments) {
    		callback();
    	});
    },

    find: function(id, callback) {
    	db.find('comments', id, function(comments) {
    		callback(comments);
    	});
    },

    delete: function(id, callback) {
    	db.delete('comments', id, function() {
    		callback();
    	});
    }
}