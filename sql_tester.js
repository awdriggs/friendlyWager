var pg = require('pg');
var dbUrl = "pg://localhost/friendly_wager_db";


var join = function(tableArray, keysArray, compareArray, cb) {
    pg.connect(dbUrl, function(err, client, done) {
        var keys = keysArray.join(', ');

        var joinString = ''
        
        for (var i = 1; i < tableArray.length; i++) {
            joinString += 'JOIN ' + tableArray[i] + " ON " + compareArray[i - 1] + " ";
        }


        var query = 'SELECT ' + keys + ' FROM ' + tableArray[0] + " " + joinString;

		console.log(query);
        
        client.query(query, function(err, result) {
            console.log(err);
            done();
            cb(result.rows);
        });
    });
    pg.end();
}

var testKeys = ['topics.id', 'topics.title', 'topics.creation_date', 'topics.active', 'topics.city', 'topics.country', 'topics.owner_id', 'users.id', 'users.username', 'comments.user_id', 'comments.topic_id', 'comments.comment']
var testTables = ['topics', 'users', 'comments'];
var testCompares = ['topics.owner_id=users.id', 'comments.topic_id=topics.id' ] 

join(testTables, testKeys, testCompares, function(data){
	console.log(data);
})


// selects the comments username with the comment
//SELECT c.comment, u.username AS commentor_username FROM comments c JOIN users u ON c.user_id=u.id;
