var Comments = require('../models/comment.js').Comment;
var IpInfo = require("ipinfo");
var marked = require('marked');

module.exports.controller = function(app) {
    app.post('/newComment/:id', function(req, res) {
        IpInfo(function(err, cLoc) {
            
            console.log(req.body.comment);

            var data = {
                topic_id: req.params.id,
                user_id: 1, //change later to be the session id
                geo_id: cLoc.loc,
                city: cLoc.city,
                region: cLoc.region,
                country: cLoc.country,
                comment: marked(req.body.comment)
            }

            Comments.create(data, function(){
            	res.redirect('/topics/'+req.params.id)
            });
        });
    });

    app.get('/comments/:id', function(req, res) {
        Comments.find(req.params.id, function(comment){
            //res.send(comment)
            res.render('editComment', comment[0])
        });
    });

    app.put('/comments/:id', function(req, res) {
       IpInfo(function(err, cLoc) {
            
            console.log(req.body.comment);

            var data = {
                user_id: 1, //change later to be the session id
                geo_id: cLoc.loc,
                city: cLoc.city,
                region: cLoc.region,
                country: cLoc.country,
                comment: marked(req.body.comment),
                topic_id: req.body.topic_id
            }

            Comments.update(data, req.params.id, function(){
                //res.send(req.body)
                res.redirect('/topics/'+data.topic_id);
            });
        });
    });

    app.delete('/comments/:id', function(req, res) {
        Comments.delete(req.params.id, function(){
            res.redirect('/topics/'+req.body.topic_id);
        })
    })
};