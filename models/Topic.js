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

    allWhere: function(where, callback) {
        var keysArray = ['topics.id', 'topics.title', 'topics.creation_date', 'topics.active', 'topics.city', 'topics.country', 'topics.owner_id', 'users.username AS owner_username', 'users.img_url']
        var tableArray = ['topics', 'users'];
        var compareArray = ['users.id=topics.owner_id WHERE ' + where]

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
        db.find('topics', id, function(topic) {

            //set to grab the comments
            var keys = ['c.id', 'c.topic_id', 'c.user_id', 'c.creation_date', 'c.city', 'c.region', 'c.country', 'c.comment', 'u.username', 'u.img_url'];
            var tables = ['comments c', 'users u'];
            var compares = ['c.user_id=u.id WHERE c.topic_id=' + id]


            db.join(tables, keys, compares, function(comments) {
                //set to grab the wagers
                var keys = ['w.id', 'w.topic_id', 'w.user_id', 'w.creation_date', 'w.city', 'w.region', 'w.country', 'w.wager', 'u.username', 'u.img_url'];
                var tables = ['wagers w', 'users u'];
                var compares = ['w.user_id=u.id WHERE w.topic_id=' + id]

                db.join(tables, keys, compares, function(wagers) {
                    db.findRelations('users', 'id', topic[0].owner_id, function(user) {

                        var data = {
                            topic: topic[0],
                            comments: comments,
                            wagers: wagers,
                            user: user[0]
                        }

                        callback(data);
                    });
                });
            });
        });
    },

    update: function(obj, id, callback) {
        console.log("object in model: "+ obj);
        db.update('topics', obj, id, function(topic) {
            console.log('from model: ' + topic)
            callback(topic);
        });
    },

    delete: function(id, callback) {
        db.delete('topics', id, function(topic) {
            callback(topic);
        });
    }
}