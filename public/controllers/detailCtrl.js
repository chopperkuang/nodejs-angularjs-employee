'use strict';

app.controller('DetailCtrl', function ($scope, $http, $rootScope, $routeParams, $location, Employee) {

    Employee.get({id: $routeParams.id}, function(employee){
        $scope.employee = employee;
    });
});