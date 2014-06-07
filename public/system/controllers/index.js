'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'api', function ($scope, Global, api) {
    $scope.global = Global;

    $scope.test = 'test123';
    $scope.currentStatus = $scope.global.user.status;

    api.getNestData().then(function(nestData) {
        $scope.nest = nestData;
    });

    api.getUsers().then(function(users) {
        $scope.users = users;
    });

    setInterval(
        function(){
            api.getNestData().then(function(nestData) {
                $scope.nest = nestData;
            });
        },
    3000);

    setInterval(
        function(){
            api.getUsers().then(function(users) {
                $scope.users = users;
            });
        },
    5000);


    $scope.nestUp = function() {
        api.nestUp().then(function(nestData) {
            $scope.nest = nestData;
        });
    };
    $scope.nestDown = function() {
        api.nestDown().then(function(nestData) {
            $scope.nest = nestData;
        });
    };
    $scope.wemoOn = function() {
        api.wemoOn().then(function(nestData) {
            //$scope.nest = nestData;
        });
    };
    $scope.wemoOff = function() {
        api.wemoOff().then(function(nestData) {
            //$scope.nest = nestData;
        });
    };
    $scope.allAway = function() {
        $scope.global.user.status = "away";
        $scope.currentStatus = $scope.global.user.status;

        api.allAway($scope.global.user._id).then(function(nestData) {
            $scope.nest = nestData;
        });
    };
    $scope.allHome = function() {
        $scope.global.user.status = "home";
        $scope.currentStatus = $scope.global.user.status;

        api.allHome($scope.global.user._id).then(function(nestData) {
            $scope.nest = nestData;
        });
    };


}]);
