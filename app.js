var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var rpc = require('json-rpc2');

// Get all connection info from Environment variables
var kodiPort = process.env.KODI_PORT || 8080,
    kodiIP   = process.env.KODI_IP   || '127.0.0.1',
    kodiUser = process.env.KODI_USER || 'kodi',
    kodiPwd  = process.env.KODI_PWD  || 'kodi';

var kodi = rpc.Client.$create(kodiPort, kodiIP, kodiUser, kodiPwd);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next) {
  console.log(req.originalUrl);
  next();
});

app.get('/rest/sets', function(req,res) {
  kodi.call('VideoLibrary.GetMovieSets', {
    properties: ['art', 'thumbnail'],
    sort: { method: 'label', ignorearticle: true }
  }, { path: '/jsonrpc' }, function(err, result) {
    res.send(result.sets);
    res.end();
  })
});

app.get('/rest/sets/:id', function(req,res) {
  kodi.call('VideoLibrary.GetMovieSetDetails', {
    setid: parseInt(req.params.id),
    movies: { properties: ['sorttitle', 'year', 'art', 'thumbnail'],
      sort: { method: 'sorttitle', ignorearticle: true }
    }
  }, { 'path': '/jsonrpc' }, function(err, result) {
    setDetails = result.setdetails;
    delete setDetails.limits;
    res.send(setDetails);
    res.end();
  })
});

app.get('/rest/movies', function(req,res) {
  kodi.call('VideoLibrary.GetMovies', {
    properties: [ 'sorttitle', 'year' ]
  }, { path: '/jsonrpc' }, function(err, result) {
    res.send(result.movies);
    res.end();
  })
});

app.get('/rest/movies/:id', function(req,res) {
  kodi.call('VideoLibrary.GetMovieDetails', {
    movieid: parseInt(req.params.id),
    properties: [ 'sorttitle', 'year', 'set', 'file', 'setid' ]
  }, { path: '/jsonrpc' }, function(err, result) {
    movieDetails = result.moviedetails;
    delete movieDetails.limits;
    res.send(movieDetails);
    res.end();
  })
});


app.get('/rest/movies/search/:query', function(req,res) {
  kodi.call('VideoLibrary.GetMovies', {
    filter: {
      field: 'title', operator: 'contains', value: req.params.query
    },
    properties: [ 'sorttitle', 'year', 'set', 'file', 'setid', 'thumbnail', 'art' ]
  }, { path: '/jsonrpc' }, function(err, result) {
    res.send(result.movies);
    res.end();
  })
});



app.get('/view/:name', function(req,res) {
  res.render(req.params.name);
});

app.get('/*', function(req,res) {
  res.render('index');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
