/**
 * Created by thomas on 02.04.15.
 */

var kSetControllers = angular.module('kSetControllers', []);

kSetControllers.controller('CollectionListCtrl', ['$scope', 'collection', function ($scope, collection) {
    $scope.sets = collection.sets;
    $scope.movies = collection.movies;
    $scope.collection = collection.collection;
}]);

kSetControllers.controller('SetEditCtrl', ['$scope', 'Set', '$routeParams', '$http', function ($scope, Set, $routeParams, $http) {
    $scope.set = Set.get({setId: parseInt($routeParams.setId) });

    $scope.removeSet = function() {
        $scope.set.movies.forEach(function (movie) {
            $http.post('/rest/movies/' + movie.movieid, {
                set: ''
            });
        });
    }
}]);