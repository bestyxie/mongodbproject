var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var morgan = require('morgan');

var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
// var mongoStore = require('connect-mongo')(cookieSession);
var dbUrl = 'mongodb://localhost/imooc';

mongoose.connect(dbUrl);

app.set('views','./app/views/pages');
app.set('view engine','jade');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
	secret:'imooc'
}));

if('development' === app.get('env')){
	app.set('showStackError',true);
	app.use(morgan(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug',true);
}

require('./config/route.js')(app);


app.locals.moment = require('moment');
app.listen(port);
console.log('start on port'+port);