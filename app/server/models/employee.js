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
    empState: {
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
    status: {
    	type: Number,
    	trim: true,
    	default: 0
    }	

});    

EmployeeSchema.statics = {
	findByNo: function(empNo, cb) {
        console.log("statics empNo => " + empNo);
        this.find({ }, cb);
	}
};

mongoose.model('Employee', EmployeeSchema);