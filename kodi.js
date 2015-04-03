/**
 * Created by thomas on 03.04.15.
 */

var rpc = require('json-rpc2');

var movieProps = [ 'sorttitle', 'year', 'plot', 'set', 'setid', 'thumbnail', 'fanart', 'file' ];
var setProps = ['art', 'thumbnail'];

module.exports = function(conf) {
    this.conf = conf;
    var kodi = rpc.Client.$create(conf.kodiPort || 8080, conf.kodiHost || 'localhost', conf.kodiUser || 'kodi', conf.kodiPwd || 'kodi');

    this.registerRoutes = function(app) {

        // Query ALL Movies
        app.get('/rest/movies', function(req,res) {
            kodi.call('VideoLibrary.GetMovies', {
                properties: movieProps
            }, { path: '/jsonrpc' }, function(err, result) {
                res.send(result.movies);
                res.end();
            })
        });

        // Query ONE Movies
        app.get('/rest/movies/:id', function(req,res) {
            kodi.call('VideoLibrary.GetMovieDetails', {
                movieid: parseInt(req.params.id),
                properties: movieProps
            }, { path: '/jsonrpc' }, function(err, result) {
                movieDetails = result.moviedetails;
                delete movieDetails.limits;
                res.send(movieDetails);
                res.end();
            })
        });

        // Search Movie by Title
        app.get('/rest/movies/search/:query', function(req,res) {
            kodi.call('VideoLibrary.GetMovies', {
                filter: {
                    field: 'title', operator: 'contains', value: req.params.query
                },
                properties: movieProps
            }, { path: '/jsonrpc' }, function(err, result) {
                res.send(result.movies);
                res.end();
            })
        });

        // Update ONE Movies
        app.post('/rest/movies/:movieid', function(req,res) {
            kodi.call('VideoLibrary.SetMovieDetails', {
                movieid: parseInt(req.params.movieid),
                set: req.body.set
            }, { path: '/jsonrpc' }, function(err, result) {
                res.send(result);
                res.end();
            })
        });



        // Query ALL Sets
        app.get('/rest/sets', function(req,res) {
            kodi.call('VideoLibrary.GetMovieSets', {
                properties: setProps
            }, { path: '/jsonrpc' }, function(err, result) {
                res.send(result.sets);
                res.end();
            })
        });

        // Query ONE Set
        app.get('/rest/sets/:id', function(req,res) {
            kodi.call('VideoLibrary.GetMovieSetDetails', {
                setid: parseInt(req.params.id),
                movies: { properties: movieProps }
            }, { 'path': '/jsonrpc' }, function(err, result) {
                setDetails = result.setdetails;
                delete setDetails.limits;
                res.send(setDetails);
                res.end();
            })
        });



    }
};