#!/usr/bin/env node

var CommandAsker    = require('../'),
    when            = require('when');

var isAdult = function(value) {
    if (value < 18) {
        return when.reject({
            'name'      : 'not_adult',
            'message'   : 'must be above 18 years'
        });
    }
    return when.resolve();  
};

var a = new CommandAsker([
    { key: 'age', ask: 'age', validators: [isAdult] }
]);

a.ask(function(response) {
    console.log('he is ' + response.age + ' years old.');
    a.close();
});
