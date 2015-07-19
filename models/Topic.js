var db = require('../db.js');

module.exports.Topic = {
    all: function(tableArray, keysArray, compareArray, callback) {

        db.join(tableArray, keysArray, compareArray, function(topics) {

            var data = {
                topics: topics
            }

            callback(data);
        });
    },

    create: function(data, callback) {
    	db.create('topics', data, function(topic) {
    		callback();
    	});
    },

    find: function(id, callback) {
    	db.find('topics', id, function(topic){
    		
    		var keys = ['c.id', 'c.topic_id', 'c.user_id', 'c.creation_date', 'c.city', 'c.region', 'c.country', 'c.comment', 'u.username', 'u.img_url'];
        	var tables = ['comments c', 'users u'];
        	var compares = ['c.user_id=u.id WHERE c.topic_id='+id]
    		

    		db.join(tables, keys, compares, function(comments){
    			db.findRelations('users', 'id', topic[0].owner_id, function(user){

    				var data = {
    					topic: topic[0],
    					comments: comments,
    					user: user[0]
    				}

    				callback(data);
    			});
    		});
    	});
    }
}
