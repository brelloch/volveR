'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'nest', function ($scope, Global, nest) {
    $scope.global = Global;

    $scope.test = 'test123';

    nest.getNestData().then(function(nestData) {
        $scope.nest = nestData;
    });

    setInterval(
        function(){
            nest.getNestData().then(function(nestData) {
                $scope.nest = nestData;
            });
        },
    3000);


    $scope.nestUp = function() {
        nest.nestUp().then(function(nestData) {
            $scope.nest = nestData;
        });
    };
    $scope.nestDown = function() {
        nest.nestDown().then(function(nestData) {
            $scope.nest = nestData;
        });
    };
    $scope.allAway = function() {
        nest.allAway().then(function(nestData) {
            $scope.nest = nestData;
        });
    };
    $scope.allHome = function() {
        nest.allHome().then(function(nestData) {
            $scope.nest = nestData;
        });
    };


}]);
