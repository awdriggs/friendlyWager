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

    //show the leaderboard
    app.get('/leaderboard/:limit', function(req, res) {
        var limit = 'LIMIT ' + req.params.limit;
        Users.sort('points', 'DESC', limit, function(data) {
            res.render('leaders', data);
        });
    })

    app.post('/newUser', function(req, res) {

        Users.create('users', req.body, function(data) {
            res.redirect('/users');
        })

    });

    //update a users score
    app.get('/addpoints/:id', function(req, res) {
        Users.addPoints(req.params.id, 10, function(data) {
            res.redirect('/users');
        })
    });

    app.post('/login', function(req, res) {
        //find user in database
        Users.findUser(req.body.username, function(user) {
            if (user != null || user != undefined) {
                //if the user is found
                if (user.password === req.body.password) {
                    req.session.currentUser = user.username;
                    req.session.currentId = user.id;
                    res.redirect('/active');
                } else {
                    res.send('password not correct');
                }

            } else {
                //if the user is not found
                res.send('user not found');
            }
        })

    });

    app.delete('/', function(req, res) {
        req.session.currentUser = null;
        req.session.currentId = null;
        res.redirect('/')
    });
}