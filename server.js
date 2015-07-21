var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var logger = require('morgan');
var path = require('path');
var session = require('express-session');

var marked = require('marked');
console.log(marked('I am using __markdown__.'));

var fs = require('fs');


//app.listen(3000);

//for heroku
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
  console.log("App running on port : ", app.get('port'));
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: 'handlebars'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.use(logger('dev'));

//setup for sessions
app.use(session({
  secret: 'thisisitotallysecret',
  saveUninitialized: false,
  resave: false
}));

//setup for method override
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

//simply requires all the .js files in a folder
fs.readdirSync('./controllers').forEach(function(file) {
    if (file.substr(-3) == '.js') {
        route = require('./controllers/' + file);
        route.controller(app, session);
    }
});



// ROUTES ///////////////////////////////////////////////////////////////////
// HOME route
app.get('/', function(req, res) {
	//if sesssion is null, send to the login page,
	if(req.session.currentUser == null || req.session.currentUser == undefined){
    res.redirect('/login');
	} else {
		res.redirect('/active');
	}
});

app.get('/login', function(req, res) {
	res.render('unkownUser', { title: 'Login', layout: 'login' });
})

//just for testing out the ip
app.get('/test', function(req, res) {
    IpInfo(function(err, cLoc) {
        console.log(err || cLoc);
        res.send(err || cLoc);
    });
})

//testing for sessions, REFACTOR LATER!
app.get('/session', function(req, res) {
  res.send(req.session);
})







