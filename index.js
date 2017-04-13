var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var app = express();

if (process.env.NODE_ENV === "test") {
  mongoose.connect('mongodb://localhost/express-authentication-test')
} else {
  mongoose.connect('mongodb://localhost/express-authentication')
  }

app.set('view en(gine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', function(req, res) {
  res.render('profile');
});

var authController = require('./controllers/auth')
app.use('/', authController);

//you can use var staticPagesController = require(./controllers/staticPages)
//app.use('/', staticPagesController)

var server
if(process.env.NODE_ENV === 'test'){
  server = app.listen(process.env.PORT || 4000)
}else {
  server = app.listen(process.env.port || 3000)
}

module.exports = server;
