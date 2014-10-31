'use strict';

var mongoose = require('mongoose'),
    Employee = mongoose.model('Employee');


exports.findOne = function(req, res) {

    console.log("id=>" + req.params.id);
    //console.log("Employee =>" + Employee);
    Employee.findByNo(83639, function(err, data) {
    	console.log(data);
        res.json(data);
    });
};