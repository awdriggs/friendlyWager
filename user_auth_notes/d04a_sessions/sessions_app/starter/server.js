var express    = require('express');
var bodyParser = require('body-parser');
var logger     = require('morgan');

var app = express();

app.use(bodyParser());
app.use(logger('dev'));
app.use(express.static('./public'));

app.listen(3000, function() {
  console.log('Server running on port 3000...');
});
