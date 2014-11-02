'use strict';

var index = require('../server/controllers'),
	employee = require('../server/controllers/employee');

module.exports = function (app) {

    //从上往下依次匹配

    //employee
    app.route('/employee').get(employee.search)
                          .post(employee.create);

    app.route('/employee/:id').get(employee.get)
                              .put(employee.update)
                              .delete(employee.destroy);

    //index
    app.route('/*').get(index.index);


};