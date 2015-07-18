
//orm
var pg = require('pg');
var dbUrl = "pg://localhost/friendly_wager_db";

//making this avaible to other js files
module.exports = {
    end: function() {
        pg.end();
    },
    all: function(table, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            client.query('SELECT * FROM ' + table, function(err, result) {
                done();
                cb(result.rows); //this has to be done to get the result.rows out of the function, return wont work
            });
        });
        this.end();
    },
    find: function(table, id, cb) {
        pg.connect(dbUrl, function(err, client, done) {
            client.query('SELECT * FROM ' + table + ' WHERE id=' + id, function(err, result) {
                done();
                cb(result.rows);
            });
        });
        this.end();
    },
    findRelations: function(table, column, id, cb){
    	pg.connect(dbUrl, function(err, client, done) {
    		client.query('SELECT * FROM ' + table + ' WHERE ' + table + '.' + column + ' = ' + id, function(err, result) {
    			done();
    			cb(result.rows);
    		});
    	});
    	this.end();
    },
    delete: function(table, id, cb){
    	pg.connect(dbUrl, function(err, client, done){
    		client.query('DELETE FROM ' + table + ' WHERE id=' + id, function(err, result){
    			done();
    			cb(result);
    		});
    	});
    	this.end();
    }, 
	create: function(table, obj, cb){
		pg.connect(dbUrl, function(err, client, done){
			var columns = [];
			var values = [];
			var dollars = [];

			Object.keys(obj).forEach(function(key, i) {
				columns.push(key);
				values.push(obj[columns[i]]);
				dollars.push('$' + (i+1));
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
		pg.connect(dbUrl, function (err, client, done){
			var columns = [];
			var set = [];
			var values = [];
			Object.keys(obj).forEach(function (key, i){
				columns.push(key);
				set.push(key + '=($' + (i + 1) + ')');
				values.push(obj[columns[i]]);
			});

			client.query('UPDATE ' + table + ' SET ' + set.join(', ')+ ' WHERE id=' + id, values, function(err, result){
				done();
				cb(result);
			});
		});
		this.end();
	},
    lJoin: function(tb1, tb2, keysString, compare1, compare2, cb) {
        pg.connect(dbUrl, function (err, client, done){
            // var columns = [];
            // var 
            // object.keys(obj).forEach(function (key, i){
            //     columns.push(key);
            
            // });
            var keys = keysString
            var query = 'SELECT ' + keys + " FROM " + tb1 + " LEFT JOIN " + tb2 + " ON " + compare1 + "=" + compare2
            
            console.log(query);
            client.query(query, function(err, result){
                done();
                cb(result.rows);
            });
        });
        this.end();
    },
    lJoinSingle: function(tb1, tb2, keysString, compare1, compare2, id, cb) {
        pg.connect(dbUrl, function (err, client, done){
            // var columns = [];
            // var 
            // object.keys(obj).forEach(function (key, i){
            //     columns.push(key);
            
            // });
            var keys = keysString
            var query = 'SELECT ' + keys + " FROM " + tb1 + " LEFT JOIN " + tb2 + " ON " + compare1 + "=" + compare2 + " WHERE " + tb1 + ".id" + "="+id; 
            
            console.log(query);
            client.query(query, function(err, result){
                done();
                cb(result.rows);
            });
        });
        this.end();
    },

};




























