'use strict';

//Global service for global variables
angular.module('mean.system').factory('api', function($http) {
   return {
        getNestData: function() {
             //return the promise directly.
             return $http.get('/nest/')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        },
        allAway: function(id) {
             //return the promise directly.
             return $http.get('/all_away/' + id)
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        },
        allHome: function(id) {
             //return the promise directly.
             return $http.get('/all_home/' + id)
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
        },
        getUsers: function() {
             //return the promise directly.
             return $http.get('/getallusers')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        }


   };
});
