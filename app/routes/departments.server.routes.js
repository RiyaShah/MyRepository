/**
 * Created by riya on 26-07-2014.
 */

'use strict';

module.exports = function(app) {
    // Root routing
    var department = require('../../app/controllers/departments');
    app.route('/department').get(department.department);
};