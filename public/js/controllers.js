/**
 * Created by thomas on 02.04.15.
 */

var kSetControllers = angular.module('kSetControllers', []);

kSetControllers.controller('CollectionListCtrl', ['$scope', 'collection', function ($scope, collection) {
    $scope.sets = collection.sets;
    $scope.movies = collection.movies;
    $scope.collection = collection.collection;

    $scope.kodiSortValue = function(item) {
        return item.sorttitle || item.title || item.label;
    }

    $scope.collectionFilter = function(item) {
        if (!$scope.query || $scope.query.length <= 2)
            return true;

        var searchString = $scope.query.toLowerCase();

        if(item.label.toLowerCase().indexOf(searchString) != -1) {
            return true;
        } else if (item.movies) {
            var found = false;
            item.movies.forEach(function(movie) {
                console.log(movie.label.toLowerCase() + ": " + movie.label.toLowerCase().indexOf(searchString));
                if (movie.label.toLowerCase().indexOf(searchString) != -1) {
                    found = true;
                }
            });
            return found;
        }
        return false;
    };
}]);

kSetControllers.controller('SetEditCtrl', ['$scope', 'set', '$location', '$http', function ($scope, set, $location, $http) {
    $scope.set = set;
    console.log(set);
    $scope.removeSet = function() {
        set.$remove(function() {
            $location.path('/collection');
        });
    }
}]);