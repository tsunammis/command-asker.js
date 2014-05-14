var execFile = require('child_process').execFile,
    expect   = require("chai").expect,
    path     = require('path');

describe('Validator', function() {
    it('Wrong age', function(done) {
        var cp  = execFile('node', [path.join(__dirname, './validator.command.js')], null),
            i   = 1;
            
        cp.stdout.on('data', function(data) {
            if (i == 1) {
                expect(data)
                    .to.contain('age:');    
            }
            
            if (i == 2) {
                expect(data)
                    .to.contain('must be above 18 years');
            }
                
            i++;
        });
        
        setTimeout(function() {
            cp.stdin.write('16\n');
            cp.stdin.end();
            done();
        }, 1000);
        
    });
    it('Good age', function(done) {
        var cp  = execFile('node', [path.join(__dirname, './validator.command.js')], null),
            i   = 1;
            
        cp.stdout.on('data', function(data) {
            if (i == 1) {
                expect(data)
                    .to.contain('age:');    
            }
            
            if (i == 2) {
                expect(data)
                    .to.contain('he is 18 years old.');
            }
                
            i++;
        });
        
        setTimeout(function() {
            cp.stdin.write('18\n');
            cp.stdin.end();
            done();
        }, 1000);
    });
});
