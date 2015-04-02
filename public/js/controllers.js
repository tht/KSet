/**
 * Created by thomas on 02.04.15.
 */

var kSetControllers = angular.module('kSetControllers', []);

kSetControllers.controller('SetListCtrl', ['$scope', 'Set', function ($scope, Set) {
    $scope.sets = Set.query();
}]);

kSetControllers.controller('SetEditCtrl', ['$scope', 'Set', '$routeParams', function ($scope, Set, $routeParams) {
    $scope.set = Set.get({setId: parseInt($routeParams.setId) });
}]);