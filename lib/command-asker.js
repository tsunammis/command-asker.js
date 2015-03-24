'use strict';

var readline        = require('readline'),
    clc             = require('cli-color'),
    _               = require('lodash'),
    when            = require('when'),
    sequence        = require('when/sequence'),
    validators      = require('./validators'),
    objectAssign    = require('object-assign');

var baseQuestion = {
    required: false,
    validators: []
};

/** 
 * Create new asker
 * 
 * @constructor 
 */
function CommandAsker(questions, options) {
    options = options || {};
    
    if (!_.isArray(questions)) {
        throw "there are no questions available :'(";
    }
    
    this.questions = questions;
    this.response = {};
    this.cli = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    this.askCallback = null;
    this.errorMsg = options.errorMsg || clc.xterm(160);
    this.currentQuestion = 0;
}

/** 
 * Launch the pool of questions
 * 
 * @param {function} askCallback
 */
CommandAsker.prototype.ask = function(askCallback) {
    if (!_.isFunction(askCallback)) {
        throw "askCallback is not a function";
    }
    
    this.askCallback = askCallback;
    this.askOne(1);
};

/** 
 * Close the console
 */
CommandAsker.prototype.close = function(code) {
    code = code || 0;
    process.exit(code);
};

/** 
 * Print error message
 */
CommandAsker.prototype.printError = function(message) {
    console.log(this.errorMsg(message));
};

/** 
 * Ask one question in the CLI
 * 
 * @param {int} questionNumber
 */
CommandAsker.prototype.askOne = function(questionNumber) {
    var asker = this;
    
    if (questionNumber > asker.questions.length || questionNumber <= 0) {
        throw "the question #" + questionNumber + " doesn't exist";
    }
    
    asker.currentQuestion = questionNumber;
    var question = objectAssign(baseQuestion, asker.questions[questionNumber - 1]);
    
    asker.cli.question(question.ask + ': ', function(answer) {
	    if (question.required) {
            question.validators.push(validators.notEmpty());
        }        
        sequence(question.validators, answer).then(function() {
            asker.response[question.key] = answer;
            asker.nextStep();
        }, function(err) {
            asker.printError(err.message);
            asker.askOne(questionNumber);
        });
    });
};

/** 
 * Determine the next step
 */
CommandAsker.prototype.nextStep = function() {
    // if it's the last question call the ask callback and close the console
    // else call the next question
    if (this.currentQuestion == this.questions.length) {
        this.askCallback(this.response);
    } else {
        this.askOne(this.currentQuestion + 1);
    }
};

module.exports = CommandAsker;