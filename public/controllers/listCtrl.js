'use strict';

app.controller('ListCtrl', function ($scope, $http, $rootScope, $routeParams, $location, Employee, UrlParse) {
        $scope.name = "人员管理";

        $scope.filter = {
            empState: '',
            keyword: '',
            pageNo: 1,
            joinAtStart: '',
            joinAtEnd: ''
        };

        $scope.filter = $.extend({}, angular.copy($scope.filter), $location.search());
        $scope.keyword = angular.copy($scope.filter.keyword);

        //监听筛选参数的变更
        $scope.$watch('filter', function (newValue, oldValue) {
            if (!oldValue) {
                return false;
            }

            console.log("filter=>" + $scope.filter.joinAtStart);
            if (newValue !== oldValue) {
                $location.search(UrlParse.buildSearch(angular.copy($scope.filter)));
            } else {
                search();
            }
        }, true);

        $rootScope.$watch('employeePopup.finished', function (value) {
            if(value === false) {
                return;
            }

            console.log("$watch employeePopup.finished");
            search();
        }, false);

        $scope.search = function(){
            $scope.filter.keyword = $scope.keyword;
        };

        $scope.create = function() {
            $rootScope.employeePopup.action = "新增";
            $rootScope.employeePopup.show = true;
            $rootScope.employeePopup.employee = {};
        };

        $scope.edit = function(empNo) {
            $rootScope.employeePopup.action = "编辑";
            $rootScope.employeePopup.show = true;

            Employee.get({id: empNo}, function(employee){
                $rootScope.employeePopup.employee = employee;
            });
        }

        //删除操作
        $scope.delete = function(empNo) {
            //var employee = Employee.get()
            if(!window.confirm("确定要删除此人员吗？")) {
                return;
            }

            Employee.delete({id: empNo}, function(data){
                console.log(data);
            });
        }

        /**
         * 搜索逻辑
         */
        function search() {
            Employee.query($scope.filter, function (employee) {
                $scope.employeeList = employee;
            });
        };

    }
);