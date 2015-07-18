var express    = require('express');
var bodyParser = require('body-parser');
var logger     = require('morgan');
var session    = require('express-session');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(session({
  secret: 'thisisitotallysecret',
  saveUninitialized: false,
  resave: false
}));
app.use(express.static('./public'));

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

app.post('/memory', function(req, res) {
  req.session.name = req.body.name;
  res.send('I will remember you.');
});

app.delete('/memory', function(req, res) {
  // delete req.session.name;
  req.session.name = null;
  res.send('I have forgotten everything');
});

app.listen(3000, function() {
  console.log('Server running on port 3000...');
});
