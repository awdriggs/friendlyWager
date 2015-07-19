var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var logger = require('morgan');
var path = require('path');
var session    = require('express-session');

var marked = require('marked');
console.log(marked('I am using __markdown__.'));

var fs = require('fs');

app.listen(3000);

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
        route.controller(app);
    }
});



// ROUTES ///////////////////////////////////////////////////////////////////
// HOME route
app.get('/', function(req, res) {
	//if sesssion is null, send to the login page
	if(req.session.name == null || req.session.name == undefined){
		res.redirect('/login');
	} else {
		res.redirect('/topics');
	}
});

app.get('/login', function(req, res) {
	res.render('unkownUser', { title: 'my other page', layout: 'login' });
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
});

app.get('/memory', function(req, res) {
  if (req.session.name) {
    res.send('Oh, I remember you. You are ' + req.session.name);
  } else {
    res.send('I do not know who you are');
  }
});

app.post('/login', function(req, res) {
  req.session.currentUser = req.body.username;
  req.session.password = req.body.password;
  res.redirect('/topics');
});


app.delete('/', function(req, res) {
  req.session.currentUser = null;
  req.session.password = null;
  res.send('logged out')
});





