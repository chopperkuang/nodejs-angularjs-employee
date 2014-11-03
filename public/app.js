var app = angular.module('app', ['ngResource', 'dui.directive']);

app.config(function ($routeProvider, $locationProvider, $httpProvider, $resourceProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/detail/:id', {
            templateUrl: '/views/partials/detail.html',
            controller: 'DetailCtrl',
            title: '人员详情'
        })
        .when('/list', {
            templateUrl: '/views/partials/list.html',
            controller: 'ListCtrl',
            title: '列表'
        }).
        otherwise({
            redirectTo: '/list'
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