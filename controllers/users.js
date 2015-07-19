var Users = require('../models/User.js').User;

module.exports.controller = function(app) {

    // app.get('/topics', function(req, res) {


    //     var testTables = ['topics', 'users', 'comments'];
    //     var testCompares = ['topics.owner_id=users.id', 'comments.topic_id=topics.id']


    //     Topics.all(testTables, testKeys, testCompares, function(data) {
    //         res.send(data);
    //         //res.render('home', data);
    //     });
    // });

    app.get('/users', function(req, res) {
        Users.all('users', function(data) {
            res.send(data);
        });
    });

    app.post('/newUser', function(req, res) {
        
        Users.create('users', req.body, function(data) {
        	res.redirect('/users');
        })

    });
}