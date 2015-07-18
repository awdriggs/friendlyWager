var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var models = require('./models');

var User = models.users;
var Post = models.posts;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/users', function(req, res) {
  User
    .findAll({ include: [Post] })
    .then(function(users) {
      res.send(users);
    });
});

app.get('/posts', function(req, res) {
  Post
    .findAll({ include: [User] })
    .then(function(posts) {
      res.send(posts);
    });
});

app.use(express.static('./public'));

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
