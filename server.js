// Server
var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var http = require('http');

// Auth
// var config = require('./config.js');
// var passport = require('passport');
// var TwitterStrategy = require('passport-twitter').Strategy;
// var session = require('express-session');

// API
var API = require('./api/Api');
var links = require('./mocks/links.js');

// React
var React = require('React');
require('node-jsx').install();
var Router = require('react-router');
var routes = require('./routes.js');

var app = express();
var port = process.env.PORT || 1337;

app.engine('handlebars', exphbs({ defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.disable('etag');

app.use(morgan('combined'))

app.use("/", express.static(__dirname + "/public/"));

app.get("/api/links", function(req,res){
  res.json(links)
});

app.get('*', function(req,res){
  API.getLinks(function(links){
    Router.renderRoutesToString(routes, req.path, function(err, ar, html, data) {
      res.render('index', {
        markup: html,
        state: links
      });
    });
  });
});

var server = http.createServer(app).listen(port, function() {
  console.log('Server started on port ' + port);
});