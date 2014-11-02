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

    var keyword = req.param('keyword') || "";
    var empState = req.param('empState') || "";
    var criteria = { $and: [
        {userName: new RegExp('.*' + keyword + '.*', "i")},
        {status: 1}
    ] }

    if(empState !== "") {
        criteria.$and.push({empState: empState});
    }

    var pageNo = (req.param('pageNo') > 0 ? req.param('pageNo') : 1) - 1;
    var perPage = 5;
    var options = {
        perPage: perPage,
        page: pageNo,
        criteria: criteria
    };

    console.log("search. => empState:"+ empState + "; keyword:" + keyword + "; pageNo:" + pageNo);

    Employee.list(options, function (err, employee) {
        if (err) {
            console.error(err);
            return res.render('500');
        }
        Employee.count(criteria).exec(function (err, count) {
            res.json({
                employeeList: employee,
                pageSize: Math.ceil(count / perPage),
                totalCount: count
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
    console.log("create employee => "+ employee);

    Employee.getMaxEmpNo(function(err, data){
        employee.empNo = parseInt(data.empNo) + 1;

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
    });
};

exports.update = function (req, res) {
    console.log("update => " + req.params.id);

    Employee.findOneAndUpdate({empNo: req.params.id}, req.body, function(err, data){
        if(!err) {
            res.json({
                status: "ok",
                empNo: data.empNo
            })
        }
    });
};

exports.destroy = function (req, res) {
    console.log("destroy => " + req.params.id);
    Employee.findOneAndUpdate({empNo: req.params.id}, { $set: { status: -1 }}, {}, function (err) {
        if (!err) {
            res.json({
                status: "ok"
            })
        } else {
            console.error(err);
        }
    })
};
