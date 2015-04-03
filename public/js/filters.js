/**
 * Created by thomas on 02.04.15.
 */

/**
 * Created by thomas on 02.04.15.
 */

var kSetFilters = angular.module('kSetFilters', ['ngResource']);

kSetFilters.filter('kodiImageToUrl', function($resource) {

    var extractRegex = /^image:\/\/(.*)\/$/;
    var testRegex = /^http:/;
    var tmdbRegex = /^http:\/\/image.tmdb.org\/t\/p\/[a-zA-Z0-9]+\/(.*)$/;

    return function(input) {

        if (matches = input.match(extractRegex)) {
            url = decodeURIComponent(matches[1]);

            // only work on http urls
            if (url.match(testRegex)) {

                // Only fetch thumbnails from tmdb.org
                if (matches = url.match(tmdbRegex)) {
                    // original: http://image.tmdb.org/t/p/original/bINIH47InJ8z7iLKuPPsy9Narub.jpg
                    // replaced: http://image.tmdb.org/t/p/w92/bINIH47InJ8z7iLKuPPsy9Narub.jpg
                    return "http://image.tmdb.org/t/p/w92/" + matches[1];
                }

                return url;
            } else {
                // Todo: Find a way to get files for 'smb' URL
                return null;
            }
        } else {
            return null;
        }

        return "TEST" + input + "TEST";
    }
});