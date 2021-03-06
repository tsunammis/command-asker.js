command-asker
================

Easy way to interact with the user through the command line.

[![Build Status](https://travis-ci.org/tsunammis/command-asker.js.svg?branch=master)](https://travis-ci.org/tsunammis/command-asker.js)
[![NPM Version](https://img.shields.io/npm/v/command-asker.svg?style=flat)](https://www.npmjs.org/package/command-asker)

## Installation

    $ npm install command-asker
    
## How to use 

```js
var CommandAsker = require('command-asker');

// Init object and configure questions 
var a = new CommandAsker([
    { key: 'firstname', ask: 'what is your firstname ? ' },
    { key: 'lastname',  ask: 'what is your lastname ? ', required: true },
    { key: 'age',  ask: 'how old are you ? ', validators: [isAdult] }
]);

// Launch the prompt command
a.ask(function(response) {
    console.log('My name is ' + response.firstname + ' ' + response.lastname + ' (' + response.age + ')');
    
    // Close the prompt command
    a.close();
});

// Validator
var isAdult = function(value) {
    if (value < 18) {
        return when.reject({
            'name'      : 'not_adult',
            'message'   : 'you must be over 18 years'
        });
    }
    return when.resolve();  
};
```

```sh
$ node ./your-file.js
what is your firstname ? chuck
what is your lastname ? norris
how old are you ? 22
My name is chuck norris (22)
```

### Validator 

The validator is optional, but, you can pass one or more validators.
A promise must be return from validator, in the case of an error, the format should be the following:

```json
{
    name      : 'not_adult',
    message   : 'you must be over 18 years'
}
```

example of validator

```js
var isAdult = function(value) {
    if (value < 18) {
        return when.reject({
            'name'      : 'not_adult',
            'message'   : 'you must be over 18 years'
        });
    }
    return when.resolve();  
};
```

### Required

You can set a question as required, you have to specify the property "required" with true.
if the user specified an empty value, he will get an error.

```js
var a = new CommandAsker([
    // ...
    { key: 'lastname',  ask: 'what is your lastname ? ', optional: true }
    // ...
]);
```

### Retrieve data 

A callback are called when the questions are launched.

The parameter is populated with the data entered by the user and they are retrievable by properties specified in configuration.

```js
a.ask(function(response) {
    console.log('My name is ' + response.firstname + ' ' + response.lastname + ' (' + response.age + ')');
});
```

## License

[MIT](https://github.com/tsunammis/command-asker.js/blob/master/LICENSE).
