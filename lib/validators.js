'use strict';

var when    = require('when'),
    _       = require('lodash');

var notEmpty = function(value) {
    return when.promise(function(resolve, reject) {
        var valueStr = String(value);
        if (_.isEmpty(valueStr)) {
            return reject({
                'name'      : 'not_empty',
                'message'   : 'the response can not be empty'
            });
        }
        return resolve();
    });
};

module.exports = {
    notEmpty: notEmpty
};