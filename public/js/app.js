/**
 * Created by thomas on 02.04.15.
 */

var kSetApp = angular.module('kSetApp', [
    'ngRoute',
    'kSetControllers',
    'kSetFilters',
    'kSetServices'
]);

kSetApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/sets', {
                templateUrl: '/view/p_sets',
                controller: 'SetListCtrl'
            }).
            when('/sets/:setId', {
                templateUrl: '/view/p_set',
                controller: 'SetEditCtrl'
            }).
            otherwise({
                redirectTo: '/sets'
            });
        $locationProvider.html5Mode(true);
    }]);