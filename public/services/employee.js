/**
 * 对员工后端数据进行操作
 *
 * 采用Restful风格进行资格约定
 */
app.factory('Employee', function ($resource) {
    return $resource('/employee/:id', null, {
        'query': {method: 'GET', isArray: false},
        'update': {method: 'PUT'}
    });
});