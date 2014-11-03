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

    // All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*').get(index.partials);

    //index
    app.route('/*').get(index.index);


};