'use strict';

app.controller('ListCtrl', function($scope, $http, $routeParams, Employee, $resource) {
        $scope.name = "毕业设计";

        var employee = Employee.get({id: 83639}, function(){
            console.log(employee);
        });

        //var employeeList = Employee.query(function(employees){
        //    console.log(employees);
        //});

        //$resource('employee').query(function(employees){
        //    console.log(employees);
        //});


    }
);