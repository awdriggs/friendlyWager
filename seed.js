var db = require('./db.js');

var users = ['awdriggs', 'clarkj', 'sambennett13'];
var photos = ['http://media.giphy.com/media/DgaabECbM9gc0/giphy.gif', 'http://media.giphy.com/media/RQgzLsPYlzrBC/giphy.gif', 'http://media.giphy.com/media/3o85xk9poU2TrP2JUY/giphy.gif'];
var firsts = ['adam', 'joe', 'sam'];
var lasts = ['driggers', 'clark', 'bennett'];
var passwords = ['a', 'j', 's'];

var adam = {
	username: users[0],
	first: firsts[0],
	last: lasts[0],
	password: passwords[0],
	img_url: photos[0]
};

var joe = {
	username: users[1],
	first: firsts[1],
	last: lasts[1],
	password: passwords[1],
	img_url: photos[1]
};

var sam = {
	username: users[2],
	first: firsts[2],
	last: lasts[2],
	password: passwords[2],
	img_url: photos[2]
};

db.create('users', adam, function(user){
	console.log(user.first + " created");
});


db.create('users', sam, function(user){
	console.log(user.first + " created");
});


db.create('users', joe, function(user){
	console.log(user.first + " created");
});

var topics = ['When will Joe grow a beard?'];
var descriptions = ['Given history, its not very likely that joe will be able to grow a beard'];
var owners = ['4'];
var geos = ['40.6100,-73.9108'];
var cities = ['Brooklyn'];
var countries = ['US'];
var regions = ['New York'];

var topic1 = {
	title: topics[0],
	description: descriptions[0],
	owner_id: owners[0],
	geo_id: geos[0],
	city: cities[0],
	country: countries[0],
	region: regions[0]
}

db.create('topics', topic1, function(topic) {
	console.log(topic + " created");
} )

var comments = {
	topic_id: 2,
	user_id: 5,
	geo_id: '38.898748, -77.037684',
	city: 'Washington',
	region: 'DC',
	country: 'US',
	comment: 'Dont poke the bear'
}

db.create('comments', comments, function(done){
	console.log(done.id);
})