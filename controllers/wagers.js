var Wagers = require('../models/wager.js').Wager;
var IpInfo = require("ipinfo");

module.exports.controller = function(app){
	app.post('/newWager/:id', function(req, res) {
        IpInfo(function(err, cLoc) {

            var data = {
                topic_id: req.params.id,
                user_id: req.session.currentId, //change later to be the session id
                geo_id: cLoc.loc,
                city: cLoc.city,
                region: cLoc.region,
                country: cLoc.country,
                wager: req.body.wager
            }

            
            Wagers.create(data, function(){
            	res.redirect('/topics/'+req.params.id)
            });
        });
    });
}