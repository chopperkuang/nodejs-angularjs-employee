'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    empNo: {
        type: Number
    },
    userName: {
        type: String,
        default: '',
        trim: true
    },
    orgName: {
        type: String,
        default: '',
        trim: true
    },
    position: {
        type: String,
        default: '',
        trim: true
    },
    joinAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    empState: {
        type: String,
        default: '',
        trim: true
    },
    status: {
        type: Number,
        trim: true,
        default: 1
    }

});

EmployeeSchema.statics = {

    list: function(options, cb) {
        var criteria = options.criteria || {};
        this.find(criteria)
            .sort({
                'joinAt': -1
            })
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb);
    },

    getMaxEmpNo: function(cb) {
        this.findOne({'status':1}).sort({'empNo': -1}).exec(cb);
    }
};
mongoose.model('Employee', EmployeeSchema, 'employee');