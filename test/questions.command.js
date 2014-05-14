#!/usr/bin/env node

var CommandAsker = require('command-asker');

var a = new CommandAsker([
    { key: 'firstname', ask: 'firstname' },
    { key: 'lastname',  ask: 'lastname' }
]);

a.ask(function(response) {
    console.log('My name is ' + response.firstname + ' ' + response.lastname);
    a.close();
});
