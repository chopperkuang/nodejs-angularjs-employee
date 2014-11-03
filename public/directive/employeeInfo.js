/**
 * 写点评的通用组件（指令）
 */
app.directive('employeeInfo', function($http, Employee){
    return {
        restrict:'E',
        templateUrl: 'employeePopupTpl',
        scope:{
            popupParams:'='
        },
        link: function(scope){

            scope.$watch('popupParams.show', function(value) {
                if(value) {
                    showPopupDiv($('#employee_layer_form'))
                    scope.popupParams.message = "";
                    scope.popupParams.finished = false;
                } else {
                    hidePopupDiv($('#employee_layer_form'));
                }
            });

            scope.submit = function() {
                var validator = $('#formEdit').validate();
                if(!validator.validateForm()){
                    return false;
                };

                if(scope.popupParams.action === "新增") {
                    console.log(scope.popupParams.employee);

                    Employee.save(scope.popupParams.employee, function(data) {
                        console.log(data);
                        if(data.status === "ok") {
                            scope.popupParams.show = false;
                            scope.popupParams.finished = true;
                        } else {
                            scope.popupParams.message = "添加失败!!";
                        }
                    });

                } else {
                    Employee.update(scope.popupParams.employee, function(data) {
                        console.log(data);
                        if(data.status === "ok") {
                            scope.popupParams.show = false;
                            scope.popupParams.finished = true;
                        } else {
                            scope.popupParams.message = "添加失败!!";
                        }
                    });
                }
            };
        }
    };
})