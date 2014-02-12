angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http) {
    'use strict';
    $scope.signin = function(username, password) {
      $http.post('/login', { username: username, password: password }).then(function(response) {
        console.log(response);
        if (response.data.success) {
          console.log('Logged In!');
        } else {
          console.log('Failed to log in');
        };
      });
    }
});
