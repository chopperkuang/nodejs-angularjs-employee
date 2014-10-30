'use strict';

var index = require('../app/server/controllers'),
	employee = require('../app/server/controllers/employee');

module.exports = function (app) {

	app.route('/employee/:id').get(employee.load);

	app.route('/*').get(index.index);

};