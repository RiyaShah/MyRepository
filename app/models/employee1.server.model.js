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
 * Employee Schema
 */
var Employee1Schema = new Schema({
    name: {
        type: String,
        default: ''
    },
    gender: {
        type: String
    },
    salary: {
        type: Number
    },
    department_id: {
        type: Schema.ObjectId,
        ref: 'Department'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Employee1', Employee1Schema);
