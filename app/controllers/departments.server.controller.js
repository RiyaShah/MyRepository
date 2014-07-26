/**
 * Created by riya on 26-07-2014.
 */

'use strict';

var mongoose = require('mongoose'),
    Department = mongoose.model('Department'),
    _ = require('lodash');

exports.department = function(req, res) {
    res.render('department');
};

exports.getAllDepartments = function(req, res) {
    Department.find().exec(function(err, departments) {
        res.jsonp(departments);
    });
};

exports.getDepartmentById = function(req, res, next, id) {
    Department.findById(id).exec(function(err, department) {
        if (! department)
            return next(new Error('No department found with id: ' + id));
        req.department = department ;
        next();
    });
};

exports.getDepartmentByName = function(req, res, deptName) {
    Department.find({name: deptName}).exec(function(err, departments) {
        res.jsonp(departments);
    });
};

exports.addDepartment = function(req, res) {
    var department = new Department();
    department.name = "Sales";

    department.save(function(err) {
        res.jsonp(department);
    });
};

exports.updateDepartment = function(req, res) {
    var department = req.department ;

    department = _.extend(department , req.body);

    department.save(function(err) {
        res.jsonp(department);
    });
};

exports.deleteDepartment = function(req, res) {
    var department = req.department ;

    department.remove(function(err) {
        res.jsonp(department);
    });
};
