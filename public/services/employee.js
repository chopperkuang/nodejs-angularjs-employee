app.
    factory('Employee', function ($resource) {
        return $resource('/employee/:id', null, {
            'query': {method: 'GET', isArray: false},
            'update': {method: 'PUT'}
        });
    });