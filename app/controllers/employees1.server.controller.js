/**
 * Created by riya on 26-07-2014.
 */

'use strict';

var mongoose = require('mongoose'),
    Employee = mongoose.model('Employee1'),
    _ = require('lodash');

exports.employee = function(req, res) {
    res.render('employee1');
};

exports.getAllEmployees = function(req, res) {
    Employee.find().exec(function(err, employees) {
        res.jsonp(employees);
    });
};

exports.getEmployeeById = function(req, res, next, id) {
    Employee.findById(id).exec(function(err, employee) {
        if (! employee)
            return next(new Error('No employee found with id: ' + id));
        req.employee = employee ;
        next();
    });
};

exports.getEmployeeByName = function(req, res, empName) {
    Employee.find({name: empName}).exec(function(err, employees) {
        res.jsonp(employees);
    });
};

exports.getEmployeeByDepartmentId = function(req, res, departmentId) {
    Employee.find({department_id: departmentId}).exec(function(err, employees) {
        res.jsonp(employees);
    });
};

exports.addEmployee = function(req, res) {
    var employee = new Employee();
    employee.name = "Riya";
    employee.department_id = 1;

    employee.save(function(err) {
        res.jsonp(employee);
    });
};

exports.updateEmployee = function(req, res) {
    var employee = req.employee ;

    employee = _.extend(employee , req.body);

    employee.save(function(err) {
        res.jsonp(employee);
    });
};

exports.deleteEmployee = function(req, res) {
    var employee = req.employee ;

    employee.remove(function(err) {
        res.jsonp(employee);
    });
};
