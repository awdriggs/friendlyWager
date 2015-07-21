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

    //route one topic, MOST PROUD SO FAR!
    app.get('/topics/:id', function(req, res) {
        Topics.find(req.params.id, function(data) {
            canEdit(req, data);
            res.render('singleTopic', data)
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
        Topics.update(req.body, req.params.id, function(data) {
            res.redirect('/topics/' + req.params.id);
        })
    })

    //process delete
    app.delete('/topics/:id', function(req, res) {
        Topics.delete(req.params.id, function(data) {
            res.redirect('/topics');
        });
    });
}