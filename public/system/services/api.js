'use strict';

//Global service for global variables
angular.module('mean.system').factory('nest', function($http) {
   return {
        getNestData: function() {
             //return the promise directly.
             return $http.get('/nest')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        },
        allAway: function() {
             //return the promise directly.
             return $http.get('/all_away')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        },
        allHome: function() {
             //return the promise directly.
             return $http.get('/all_home')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        },
        nestAway: function() {
             //return the promise directly.
             return $http.get('/nest_away')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        },
        nestHome: function() {
             //return the promise directly.
             return $http.get('/nest_home')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        },
        nestUp: function() {
             //return the promise directly.
             return $http.get('/nest_up')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        },
        nestDown: function() {
             //return the promise directly.
             return $http.get('/nest_down')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        }


   };
});
