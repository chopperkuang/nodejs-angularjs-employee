'use strict';

var mongoose = require('mongoose'),
    Employee = mongoose.model('Employee');


/**
 * 查询员工信息
 * 并进行分页返回
 *
 * @param req
 * @param res
 */
exports.search = function (req, res) {
    console.log("search.");
    // { $or:[ {'_id':objId}, {'name':param}, {'nickname':param} ]}
    var keyword = req.param('keyword') || "";
    var criteria = { $or: [
        {userName: new RegExp('.*' + keyword + '.*', "i")}
    ] }
    //var criteria = {$or: [{userName: new RegExp('.*'+ keyword +'.*', "i")}, {empNo: new RegExp('.*'+ keyword +'.*', "i")}]};
    var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
    var perPage = 15;
    var options = {
        perPage: perPage,
        page: page,
        criteria: criteria
    };

    Employee.list(options, function (err, employee) {
        if (err) {
            console.error(err);
            return res.render('500');
        }
        Employee.count(criteria).exec(function (err, count) {
            res.json({
                employeeList: employee
            })
        })
    });
};

/**
 * 根据empNo，获取单个员工信息
 *
 * @param req
 * @param res
 */
exports.get = function (req, res) {
    Employee.findOne({
        empNo: req.params.id
    }, function (err, data) {
        console.log(data);
        res.json(data);
    });
};

exports.create = function (req, res) {
    var employee = new Employee(req.body);

    //todo 查找最大的empNo
    employee.save(function (err, data) {
        if (!err) {
            res.json({
                status: 'ok',
                empNo: data.empNo
            })
        } else {
            res.json({
                status: 'fail'
            })
        }
    })
};

exports.update = function (req, res) {
    res.json({
        status: 'fail'
    })
};

exports.destroy = function (req, res) {
    Employee.findByIdAndUpdate(req.params.empNo, { $set: { status: -1 }}, {}, function (err) {
        if (!err) {
            res.json({
                status: "ok"
            })
        }
    })
};
