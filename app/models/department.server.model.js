/**
 * Created by riya on 26-07-2014.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Department Schema
 */
var DepartmentSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Employee name',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Department', DepartmentSchema);
