'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Employee = mongoose.model('Employee'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Employee already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Employee
 */
exports.create = function(req, res) {
	var employee = new Employee(req.body);
	employee.user = req.user;

	employee.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(employee);
		}
	});
};

/**
 * Show the current Employee
 */
exports.read = function(req, res) {
	res.jsonp(req.employee);
};

/**
 * Update a Employee
 */
exports.update = function(req, res) {
	var employee = req.employee ;

	employee = _.extend(employee , req.body);

	employee.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(employee);
		}
	});
};

/**
 * Delete an Employee
 */
exports.delete = function(req, res) {
	var employee = req.employee ;

	employee.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(employee);
		}
	});
};

/**
 * List of Employees
 */
exports.list = function(req, res) { Employee.find().sort('-created').populate('user', 'displayName').exec(function(err, employees) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(employees);
		}
	});
};

/**
 * Employee middleware
 */
exports.employeeByID = function(req, res, next, id) { Employee.findById(id).populate('user', 'displayName').exec(function(err, employee) {
		if (err) return next(err);
		if (! employee) return next(new Error('Failed to load Employee ' + id));
		req.employee = employee ;
		next();
	});
};

/**
 * Employee authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.employee.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};