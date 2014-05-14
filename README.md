command-asker
================

Easy way to interact with the user through the command line.

## Installation

    $ npm install command-asker
    
## How to use 

```js
var CommandAsker = require('command-asker');

var isAdult = function(value) {
    if (value < 18) {
        return when.reject({
            'name'      : 'not_adult',
            'message'   : 'you must be over 18 years'
        });
    }
    return when.resolve();  
};

var a = new CommandAsker([
    { key: 'firstname', ask: 'what is your firstname ? ' },
    { key: 'lastname',  ask: 'what is your lastname ? ' },
    { key: 'age',  ask: 'how old are you ? ', validators: [isAdult] }
]);

a.ask(function(response) {
    console.log('My name is ' + response.firstname + ' ' + response.lastname + ' (' + response.age + ')');
    a.close();
});
```

```sh
$ node ./your-file.js
what is your firstname ? chuck
what is your lastname ? norris
how old are you ? 22
My name is chuck norris (22)
```

### Validator 

The validator is optional, but, you can pass one or more validators if you want.
For work, a promise must be return from validator.

example

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

### Retrieve data 

A callback are called when the questions are launched.

The parameter is populated with the data entered by the user and they are retrievable by properties specified in configuration.

```js
a.ask(function(response) {
    console.log('My name is ' + response.firstname + ' ' + response.lastname + ' (' + response.age + ')');
});
```

## License

[GPL v2](https://github.com/tsunammis/command-asker.js/blob/master/LICENSE).