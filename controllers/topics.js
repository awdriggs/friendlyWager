var Topics = require('../models/topic.js').Topic;
var IpInfo = require("ipinfo");
var marked = require('marked');
module.exports.controller = function(app) {
	//route to get to newtopic form
    app.get('/topics/new', function(req, res) {
        res.render('newtopic');
    })

	//view all topics, with user who created
    app.get('/active', function(req, res) {
    	//refacotßr in model!
        var testKeys = ['topics.id', 'topics.title', 'topics.creation_date', 'topics.active', 'topics.city', 'topics.country', 'topics.owner_id', 'users.username AS owner_username', 'users.img_url']
        var testTables = ['topics', 'users'];
        var testCompares = ['users.id=topics.owner_id WHERE topics.active=true']

        Topics.all(testTables, testKeys, testCompares, function(data) {
            //res.send(data);
            res.render('home', data);
        });
    });

    //see the ended tasks
    app.get('/ended', function(req, res) {
        
    	//refactor in model
        var testKeys = ['topics.id', 'topics.title', 'topics.creation_date', 'topics.active', 'topics.city', 'topics.country', 'topics.owner_id', 'users.username AS owner_username', 'users.img_url']
        var testTables = ['topics', 'users'];
        var testCompares = ['users.id=topics.owner_id WHERE topics.active=false']

        Topics.all(testTables, testKeys, testCompares, function(data) {
            //res.send(data);
            res.render('home', data);
        });
    });

    //route one topic
    app.get('/topics/:id', function(req, res) {
        Topics.find(req.params.id, function(data) {
            //res.send(data);
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
                owner_id: 1, //update once session is working!
                geo_id: cLoc.loc,
                city: cLoc.city,
                region: cLoc.region,
                country: cLoc.country
            }

            Topics.create(formData, function() {
                res.redirect('/topics');
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
    		res.redirect('/topics/'+req.params.id);
    	});
    });

    //process delete
    app.delete('/topics/:id', function(req, res) {
    	Topics.delete(req.params.id, function(data) {
    		res.redirect('/topics');
    	});
    });
}