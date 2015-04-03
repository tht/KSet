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
            when('/collection', {
                templateUrl: '/view/p_collection',
                controller: 'CollectionListCtrl',
                resolve: {
                    collection: function(Collection) {
                        return Collection;
                    }
                }
            }).
            when('/sets/:setId', {
                templateUrl: '/view/p_set',
                controller: 'SetEditCtrl'
            }).
            otherwise({
                redirectTo: '/collection'
            });
        $locationProvider.html5Mode(true);
    }]);