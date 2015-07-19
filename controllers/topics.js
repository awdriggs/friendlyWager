var Topics = require('../models/topic.js').Topic;
var IpInfo = require("ipinfo");

module.exports.controller = function(app) {

    app.get('/topics', function(req, res) {

        var testKeys = ['topics.id', 'topics.title', 'topics.creation_date', 'topics.active', 'topics.city', 'topics.country', 'topics.owner_id', 'users.username AS owner_username', 'users.img_url']
        var testTables = ['topics', 'users'];
        var testCompares = ['users.id=topics.owner_id']



        Topics.all(testTables, testKeys, testCompares, function(data) {
            //res.send(data);
            res.render('home', data);
        });
    });

    app.get('/topic/:id', function(req, res) {
    	Topics.find(req.params.id, function(data) {
    		res.send(data);
    		//res.render('singleTopic', data)
    	});

    });

    app.get('/topics/new', function(req, res) {
        res.render('newtopic');
    })

    app.post('/topics', function(req, res) {
        IpInfo(function(err, cLoc) {
            console.log(err || cLoc);
            
            var formData = {
            	title: req.body.title,
            	description: req.body.description,
            	owner_id: 1, //update once session is working!
            	geo_id: cLoc.loc,
            	city: cLoc.city,
            	region: cLoc.region,
            	country: cLoc.country
    		}

    		Topics.create(formData, function(){
    			res.redirect('/topics');
    		});
        });
    }),

    app.get('/topics/ended', function(req, res){
    	var testKeys = ['topics.id', 'topics.title', 'topics.creation_date', 'topics.active', 'topics.city', 'topics.country', 'topics.owner_id', 'users.id', 'users.username AS owner_username', 'users.img_url'];
        var testTables = ['topics', 'users'];
        var testCompares = ['users.id=topics.owner_id WHERE topics.active=false']



        Topics.all(testTables, testKeys, testCompares, function(data) {
            //res.send(data);
            res.render('home', data);
        });
    })
}