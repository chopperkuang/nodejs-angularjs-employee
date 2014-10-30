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
	orgName: {},
	position: {},
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
    	default: 1
    }	

});    

EmployeeSchema.statics = {
	list: function(options, cb) {
		
		/**
		var criteria = options.criteria || {};
        this.find(criteria, '-body -html')
            .populate('user', 'username empNo')
            .populate('updater', 'username empNo')
            .populate('comments.user', 'username empNo')
            .sort({
                'commentAt': -1,
                'updatedAt': -1,
                'createdAt': -1
            })
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb);
        */	
	}
};
mongoose.model('Employee', EmployeeSchema);