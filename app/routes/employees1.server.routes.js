/**
 * Created by riya on 26-07-2014.
 */

'use strict';

module.exports = function(app) {
    // Root routing
    var employee = require('../../app/controllers/employees1');
    app.route('/employee').get(employee.employee);
};