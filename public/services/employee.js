app.
    factory('Employee', function($resource){
        return $resource('employee/:id');
    });