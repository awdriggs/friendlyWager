//orm
var pg = require('pg');
var dbUrl = "pg://localhost/friendly_wager_db";
//var dbUrl = process.env.DATABASE_URL //for heroku

//making this avaible to other js files
module.exports = {
    end: function() {
        pg.end();
    },
    all: function(table, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            client.query('SELECT * FROM ' + table, function(err, result) {
                done();
                console.log(err);
                cb(result.rows); //this has to be done to get the result.rows out of the function, return wont work
            });
        });
        this.end();
    },

    find: function(table, id, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            client.query('SELECT * FROM ' + table + ' WHERE id=' + id, function(err, result) {
                done();
                console.log(err);
                cb(result.rows);
            });
        });
        this.end();
    },

    findWithCompare: function(table, where, search, cb) {
        pg.connect(dbUrl, function(err, client, done) {

            var query = ('SELECT * FROM ' + table + ' WHERE ' + where + '=$1');
            console.log("fucked query " + query);


            client.query('SELECT * FROM ' + table + ' WHERE ' + where + '=$1', [search], function(err, result) {
                done();
                console.log(err);
                cb(result.rows);
            });
        });
        this.end();
    },

    sort: function(table, sort_columm, order, limit, cb) {
        pg.connect(dbUrl, function(err, client, done) {

            var query = 'SELECT * FROM ' + table + ' ORDER BY ' + sort_columm + ' ' + order + ' ' + limit;
            console.log(query);
            client.query('SELECT * FROM ' + table + ' ORDER BY ' + sort_columm + ' ' + order + ' ' + limit, function(err, result) {
                done();
                console.log(err);
                cb(result.rows);
            });
        });
        this.end();
    },

    search: function(table, searchColumn, id, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            client.query('SELECT * FROM ' + table + ' WHERE ' + searchColumn + '=' + id, function(err, result) {
                done();
                console.log(err);
                cb(result.rows);
            });
        });
        this.end();
    },
    findRelations: function(table, column, id, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            var query = 'SELECT * FROM ' + table + ' WHERE ' + table + '.' + column + ' = ' + id
            console.log(query);
            client.query(query, function(err, result) {
                done();

                console.log(err);
                cb(result.rows);
            });
        });
        this.end();
    },
    delete: function(table, id, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            client.query('DELETE FROM ' + table + ' WHERE id=' + id, function(err, result) {
                done();
                cb(result);
            });
        });
        this.end();
    },
    create: function(table, obj, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            var columns = [];
            var values = [];
            var dollars = [];

            Object.keys(obj).forEach(function(key, i) {
                columns.push(key);
                values.push(obj[columns[i]]);
                dollars.push('$' + (i + 1));
            })
            var query = 'INSERT INTO ' + table + '(' + columns.join(', ') + ') VALUES (' + dollars.join(', ') + ') RETURNING id AS id';
            client.query(query, values, function(err, result) {
                console.log(err);
                done();
                cb(result.rows[0]);
            });
        });
        this.end();
    },
    update: function(table, obj, id, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            var columns = [];
            var set = [];
            var values = [];
            Object.keys(obj).forEach(function(key, i) {
                columns.push(key);
                set.push(key + '=($' + (i + 1) + ')');
                values.push(obj[columns[i]]);
            });

            var query = 'UPDATE ' + table + ' SET ' + set.join(', ') + ' WHERE id=' + id;
            console.log(query);
            client.query('UPDATE ' + table + ' SET ' + set.join(', ') + ' WHERE id=' + id, values, function(err, result) {
                console.log(err + " " + result);
                done();
                cb(result);
            });
        });
        this.end();
    },
    lJoin: function(tb1, tb2, keysString, compare1, compare2, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            // var columns = [];
            // var 
            // object.keys(obj).forEach(function (key, i){
            //     columns.push(key);

            // });
            var keys = keysString
            var query = 'SELECT ' + keys + " FROM " + tb1 + " LEFT JOIN " + tb2 + " ON " + compare1 + "=" + compare2

            console.log(query);
            client.query(query, function(err, result) {
                done();
                cb(result.rows);
            });
        });
        this.end();
    },
    lJoinSingle: function(tb1, tb2, keysString, compare1, compare2, id, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            // var columns = [];
            // var 
            // object.keys(obj).forEach(function (key, i){
            //     columns.push(key);

            // });
            var keys = keysString
            var query = 'SELECT ' + keys + " FROM " + tb1 + " LEFT JOIN " + tb2 + " ON " + compare1 + "=" + compare2 + " WHERE " + tb1 + ".id" + "=" + id;

            console.log(query);
            client.query(query, function(err, result) {
                done();
                cb(result.rows);
            });
        });
        this.end();
    },

    leftJoin: function(tableArray, keysArray, compareArray, cb) {
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
        this.end();
    },

    join: function(tableArray, keysArray, compareArray, cb) {
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

                //console.log(result.rows);
                cb(result.rows);
            });
        });
        this.end(); //can't remember why i used pg.end instead of this.end
    },

    singleUser: function(id, cb) {

        pg.connect(dbUrl, function(err, client, done) {
            //set query to get the user
            var query = 'SELECT * FROM users WHERE id=' + id;
            client.query(query, function(err, user) {
                //set query for topics
                query = 'SELECT topics.title, topics.id FROM topics JOIN users ON users.id = topics.owner_id WHERE topics.owner_id=' + id;
                client.query(query, function(err, topics) {
                    //set query for comments
                    query = 'SELECT topics.title, topics.id, comments.comment FROM comments JOIN users ON users.id = comments.user_id JOIN topics ON topics.id = comments.topic_id WHERE comments.user_id=' + id;
                    client.query(query, function(err, comments) {
                        //set query for wagers
                        query = 'SELECT t.title, t.id, w.wager FROM wagers w JOIN users u ON u.id = w.user_id JOIN topics t ON t.id = w.topic_id WHERE w.user_id=' + id;
                        client.query(query, function(err, wagers) {
                            var data = {
                                user: user.rows[0],
                                topics: topics.rows,
                                comments: comments.rows,
                                wagers: wagers.rows
                            }
                            cb(data);
                        });
                    });
                });
            });
        });
        this.end(); // added this and haven't test, remove it breaks shit!
    },

    orderWagers: function(topic_id, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            var query = "SELECT u.id, u.username, w.wager, t.complete_date, ((DATE_PART('day', w.wager::TIMESTAMP - t.complete_date::TIMESTAMP) * 24 + DATE_PART('hour', w.wager::TIMESTAMP - t.complete_date::TIMESTAMP)) * 60 + DATE_PART('minute', w.wager::TIMESTAMP - t.complete_date::TIMESTAMP)) * 60 + DATE_PART('second', w.wager::TIMESTAMP - t.complete_date::TIMESTAMP) AS time_diff FROM wagers w JOIN users u ON u.id = w.user_id JOIN topics t ON t.id = w.topic_id WHERE w.topic_id = $1 ORDER BY time_diff;";
            client.query(query, [topic_id], function(err, rank) {

                cb(rank.rows);
            });
        });
        this.end();
    }

};
