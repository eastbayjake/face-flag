// Node & Express Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var port = 3000;
var app = express();

// Express 4.0 Middleware
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var compression = require('compression');
var errorHandler = require('errorhandler');

// Resolve the path for static content ("assets")
// Anything in the assets folder can be served as
// static content by the server, so be careful!
var assetsPath = path.join(__dirname, 'assets');
var viewPath = assetsPath + '/views';

// Configure app
app.set('port', port);
console.log('assetspath: ', assetsPath);
app.set('views', viewPath);
app.set('view engine', 'ejs');

// Configure middleware
app.use(favicon(assetsPath + '/images/lebanon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(compression());
app.use(express.static(assetsPath));

// Routes
app.get('/', function(req, res){
  res.sendFile('index.html', {root: viewPath});
});

// Start server (only needs to be HTTP since AWS ELB proxies requests over HTTPS)
http.createServer(app).listen(app.get('port'), function(){
  console.log('Flag Face listening on port %s', app.get('port'));
});