var db = require('../db.js');

module.exports.topic = {
    all: function(tableArray, keysArray, compareArray, callback) {

        db.join(tableArray, keysArray, compareArray, function(topics) {

            var data = {
                topics: topics
            }

            callback(data);
        });
    },

    allWhere: function(where, callback) {
        var keysArray = ['topics.id', 'topics.title', "to_char(topics.creation_date , 'MM/DD/YY HH12:MI:SS') AS creation_date", 'topics.active', 'topics.city', 'topics.country', 'topics.owner_id', 'users.username AS owner_username', 'users.img_url']
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
        db.find('topics', id, function(topic) { //rewrite this to get the topic date in correct format

            //set to grab the comments
            var keys = ['c.id', 'c.topic_id', 'c.user_id', "to_char(c.creation_date , 'MM/DD/YY HH12:MI:SS') AS creation_date", 'c.city', 'c.region', 'c.country', 'c.comment', 'u.username', 'u.img_url'];
            var tables = ['comments c', 'users u'];
            var compares = ['c.user_id=u.id WHERE c.topic_id=' + id]

            //join the comments to the single topic
            db.join(tables, keys, compares, function(comments) {

                //setup to grab the wagers
                var keys = ['w.id', 'w.topic_id', 'w.user_id', "to_char(w.creation_date , 'MM/DD/YY HH12:MI:SS') AS creation_date", 'w.city', 'w.region', 'w.country', "to_char(w.wager , 'MM/DD/YY HH12:MI:SS') AS wager", 'u.username', 'u.img_url'];
                var tables = ['wagers w', 'users u'];
                var compares = ['w.user_id=u.id WHERE w.topic_id=' + id]

                //join the wagers to single topic
                db.join(tables, keys, compares, function(wagers) {
                    //find the user related to this topic
                    db.findRelations('users', 'id', topic[0].owner_id, function(user) {
                        //wrap all in a data object
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
        console.log("object in model: " + obj);
        db.update('topics', obj, id, function(topic) {
            console.log('from model: ' + topic)
            callback(topic);
        });
    },

    delete: function(id, callback) {
        db.delete('topics', id, function(topic) {
            callback(topic);
        });
    },
    //this function makes me want to cry 
    complete: function(obj, id, callback) {
        //do an update to set active to false and set the completion data
        db.update('topics', obj, id, function(topic) {
            //order the wagers using the completion data
            db.orderWagers(id, function(wagersRanked) { //need to write this into .db
                var winner_id = wagersRanked[0].id
                console.log('91, w_id'+ winner_id);
                var winner = {
                        winner_id: winner_id
                    }
                console.log('95, w object' + winner.winner_id)
                    //do another update to topics, make the winner the topics.winner_id
                db.update('topics', winner, id, function(topic_data) {

                    //add points
                    //find the winner current points, add 1 to it, send an update to users with the new points
                    db.find('users', winner_id, function(winner_data) {
                        //callback(winner_data[0]);
                        console.log('points before ' + winner_data[0].points)
                        var points = winner_data[0].points;
                        points = points + 1;

                        var object = {
                            points: points
                        }
                        console.log('points after in obj' + object.points);

                        db.update('users', object, winner_id, function(winner_data2) {
                            console.log(winner_data2);
                            callback(winner_data2);
                        });
                    });
                });
            });
        });
    },

    getRank: function(id, callback) {
        db.orderWagers(id, function(wagersRanked) { //need to write this into .db
            callback(wagersRanked);
        });
    }
}

//find active
//SELECT topics.id, topics.title, to_char(topics.creation_date , 'MM/DD/YY HH12:MI:SS') AS creation_date, topics.active, topics.city, topics.country, topics.owner_id, users.username AS owner_username, users.img_url, (SELECT COUNT(wagers.topic_id) FROM wagers WHERE wagers.topic_id = topics.id) as wager_count, (SELECT COUNT(comments.topic_id) FROM comments WHERE comments.topic_id = topics.id) as comment_count FROM topics JOIN users ON users.id=topics.owner_id WHERE active=true;

//find inactive
//SELECT topics.id, topics.title, to_char(topics.creation_date , 'MM/DD/YY HH12:MI:SS') AS creation_date, topics.active, topics.city, topics.country, topics.owner_id, users.username AS owner_username, users.img_url, (SELECT COUNT(wagers.topic_id) FROM wagers WHERE wagers.topic_id = topics.id) as wager_count, (SELECT COUNT(comments.topic_id) FROM comments WHERE comments.topic_id = topics.id) as comment_count FROM topics JOIN users ON users.id=topics.owner_id WHERE active=false;
