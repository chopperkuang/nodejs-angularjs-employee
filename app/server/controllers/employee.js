'use strict';

var mongoose = require('mongoose'),
    Employee = mongoose.model('Employee');


exports.load = function(req, res) {

    console.log("id=>" + req.params.id);
    Employee.findOne({
        _id: req.params.id
    }, function(err, data) {
        res.json(data);
    });
};