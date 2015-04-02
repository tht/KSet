/**
 * Created by thomas on 02.04.15.
 */

/**
 * Created by thomas on 02.04.15.
 */

var kSetServices = angular.module('kSetServices', ['ngResource']);

kSetServices.factory('Set', ['$resource',
    function($resource) {
        return $resource('rest/sets/:setId');
    }]);