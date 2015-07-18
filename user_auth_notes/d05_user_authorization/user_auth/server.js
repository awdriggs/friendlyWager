var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var bcrypt = require('bcrypt');
var session = require('express-session');
var models = require('./models');

var User = models.users;
var Post = models.posts;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'allthethings',
  saveUninitialized: false,
  resave: false
}));

// Callbacks
var restrictAccess = function(req, res, next) {
  console.log('hi', req.session.currentUser, req.params.id)
  var sessionID = parseInt(req.session.currentUser);
  var reqID = parseInt(req.params.id);
  sessionID === reqID ? next() : res.status(400).send({ err: 400, msg: 'YOU SHALL NOT PASS!'});
};

var authenticate = function(req, res, next) {
  req.session.currentUser ? next() : res.status(403).send({ err: 403, msg: 'Log in troll'});
};

// Our Middleware for restricting access
// app.use('/users/(:id)(/posts)?', function(req, res, next) {
//   console.log('hi', req.session.currentUser, req.params.id)
//   var sessionID = parseInt(req.session.currentUser);
//   var reqID = parseInt(req.params.id);
//   sessionID === reqID ? next() : res.status(401).send({ err: 401, msg: 'YOU SHALL NOT PASS!'});
// });

app.get('/users', function(req, res) {
  User
    .findAll({ include: [Post] })
    .then(function(users) {
      res.send(users);
    });
});

app.post('/users', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  bcrypt.hash(password, 10, function(err, hash) {
    User
      .create({
        username: username,
        password_digest: hash
      })
      .then(function(user) {
        res.send(user);
      });
  });
});

// I DO
app.get('/users/:id', authenticate, restrictAccess, function(req, res) {
  var userID = req.params.id;

  User
    .findOne({
      where: { id: userID },
      include: [Post]
    })
    .then(function(user) {
      res.send(user);
    });
});

app.post('/sessions', function(req, res) {
  var loginUsername = req.body.username;
  var loginPassword = req.body.password;

  User
    .findOne({
      where: { username: loginUsername }
    })
    .then(function(user) {
      if (user) {
        var passwordDigest = user.password_digest;
        bcrypt.compare(loginPassword, passwordDigest, function(err, result) {
          if (result) {
            req.session.currentUser = user.id;
            res.send('Correct Credentials');
          } else {
            res.status(400);
            res.send({
              err: 400,
              msg: 'Wrong password buddy'
            });
          }
        });
      } else {
        res.status(400);
        res.send({
          err: 400,
          msg: 'Username does not exist'
        });
      }
    });
});

app.delete('/sessions', authenticate, function(req, res) {
  delete req.session.currentUser;
  res.send('Successfully logged out.');
});

app.get('/current_user', function(req, res) {
  var userID = req.session.currentUser;
  User
    .findOne(userID)
    .then(function(user) {
      res.send(user)
    });
});

app.get('/posts', function(req, res) {
  Post
    .findAll({ include: [User] })
    .then(function(posts) {
      res.send(posts);
    });
});

app.post('/posts', authenticate, function(req, res) {
  Post
    .create({
      content: req.body.content,
      user_id: req.session.currentUser
    })
    .then(function(post) {
      res.send(post);
    });
});

// YOU DO
app.get('/users/:id/posts', authenticate, restrictAccess, function(req, res) {
  Post
    .findAll({
      where: { user_id: req.params.id },
    })
    .then(function(posts) {
      res.send(posts);
    });
});

app.post('/users/:id/posts', authenticate, restrictAccess, function(req, res) {
  Post
    .create({
      content: req.body.content,
      user_id: req.params.id
    })
    .then(function(post) {
      res.send(post);
    });
});

app.use(express.static('./public'));

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
