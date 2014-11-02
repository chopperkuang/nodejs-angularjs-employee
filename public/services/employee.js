app.
    factory('Employee', function ($resource) {
        return $resource('employee/:id', {id:'@empNo'}, {
            'query': {method: 'GET', isArray: false},
            'update': {method: 'PUT'}
        });
    });