var app = angular.module('app', ['ngResource', 'dui.directive']);

app.config(function ($routeProvider, $locationProvider, $httpProvider, $resourceProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/views/index.html',
            controller: 'ListCtrl',
            title: '列表'
        }).
        otherwise({
            redirectTo: '/'
        });

    // Don't strip trailing slashes from calculated URLs

});

app.run(function ($rootScope, $http, Constants) {
    $rootScope.constants = Constants;

    $rootScope.employeePopup = {
        employee: {},
        action: "新增",
        message: "",
        constants: Constants,
        show: false,
        finished: false
    };
});