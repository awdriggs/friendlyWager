var Topics = require('../models/topic.js').Topic;
var IpInfo = require("ipinfo");
var marked = require('marked');
var authenticate = require('../helpers.js').authenticate;
var canEdit = require('../helpers.js').canEdit;

module.exports.controller = function(app) {
    //route to get to newtopic form
    app.get('/topics/new', function(req, res) {
        res.render('newtopic');
    })

    //view all topics, with user who created
    app.get('/active', function(req, res) {
        if (authenticate(req)) {
            Topics.allWhere('active=true', function(data) {
                //res.send(data);
                res.render('home', data);
            });
        } else {
            res.redirect('/')
        }
    });

    //see the ended tasks
    app.get('/ended', function(req, res) {
        Topics.allWhere('active=false', function(data) {
            //res.send(data);
            res.render('home', data);
        });
    });

    //route one topic, MOST PROUD
    app.get('/topics/:id', function(req, res) {
        Topics.find(req.params.id, function(data) {
            canEdit(req, data);
            //if active, send to single topic
            if (data.topic.active) {
                //res.send(data);
                res.render('singleTopic', data);
            } else {
                //if ended, grab the ranks, add ranks to data, send to endedTopic hb
                Topics.getRank(req.params.id, function(rank) {
                    data.rank = rank;
                    //res.send(data);
                    res.render('endedTopic', data);

                });
            } 
        });
    });

    //add a new topic
    app.post('/topics', function(req, res) {
        IpInfo(function(err, cLoc) {
            console.log(err || cLoc);

            var formData = {
                title: req.body.title,
                description: marked(req.body.description),
                owner_id: req.session.currentId, //update once session is working!
                geo_id: cLoc.loc,
                city: cLoc.city,
                region: cLoc.region,
                country: cLoc.country
            }

            Topics.create(formData, function() {
                res.redirect('/active');
            });
        });
    });



    //edit page
    app.get('/topics/edit/:id', function(req, res) {
        Topics.find(req.params.id, function(data) {
            //res.send(data);
            res.render('editTopic', data)
        });

    });

    //process edit
    app.put('/topics/:id', function(req, res) {
        //res.send(req.body)

        Topics.update(req.body, req.params.id, function(data) {
            //res.send('data?' + data);
            res.redirect('/topics/' + req.params.id);
        });
    });

    //all the fancy time checks should go here!
    //maybe refactor into the helper once they are complete

    //psuedo
    //on complete, check to see which user had the closest guess, sql function?
    //give that user some points, return to this topic page
    //have the winner displayed!
    app.put('/topics/complete/:id', function(req, res) {
        //do the query to order the wagers, 

        //build data
        //complete date
        //active should become false, right now this is handled in the form,
        //make the winner the top item in the return from that bitch of a query, winner!

        //add points to the user with the user.id from the winner

        Topics.complete(req.body, req.params.id, function(data) {
            //res.send(data)
            res.redirect('/topics/' + req.params.id);
        })
    })

    //process delete
    app.delete('/topics/:id', function(req, res) {
        Topics.delete(req.params.id, function(data) {
            res.redirect('/topics');
        });
    });

    app.get('/testComplete', function(req, res) {
        Topics.complete(8, function(rank) {
            res.send(rank);
        })
    })
}