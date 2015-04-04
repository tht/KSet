/**
 * Created by thomas on 02.04.15.
 */

/**
 * Created by thomas on 02.04.15.
 */

var kSetServices = angular.module('kSetServices', ['ngResource']);

kSetServices.factory('Set', ['$resource',
    function($resource) {
        return $resource('rest/sets/:setid', {setid: '@setid'});
    }]);


kSetServices.factory('Movie', ['$resource',
    function($resource) {
        return $resource('rest/movies/:movieid');
    }]);

kSetServices.factory('Collection', ['Movie', 'Set', '$q',
    function(Movie, Set, $q) {

        return $q.all([Set.query().$promise, Movie.query().$promise]).then(function(results) {

            var collection = [];

            var sets = [];
            results[0].forEach(function(set) {
                set.movies = [];
                sets[set.setid] = set;
                collection.push(set);
            });
            var movies = [];
            results[1].forEach(function(movie) {
                movies[movie.movieid] = movie;
                if (movie.setid) {
                    sets[movie.setid].movies.push(movie);
                } else {
                    collection.push(movie);
                }
            });

            return {
                collection: collection,
                sets: sets,
                movies: movies
            };
        });
    }]);

