angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
    'use strict';
    $scope.identity = mvIdentity;

    $scope.signin = function(username, password) {
      mvAuth.authenticateUser(username, password).then(function(success) {
        if (success) {
          mvNotifier.notify('You have successfully signed in!.');
        } else{
          mvNotifier.notify('Username or Password are incorrect.');
        };
      });
    };

    $scope.signout = function(username, password) {
      mvAuth.logoutUser().then(function() {
        $scope.username = "";
        $scope.password = "";
        mvNotifier.notify('You have successfully signed out!');
        $location.path('/');
      });
    }


});
