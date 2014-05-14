var execFile = require('child_process').execFile,
    expect   = require("chai").expect,
    path     = require('path');

describe('Multiple questions', function() {
    it('What is your name ?', function(done) {
        var cp  = execFile('node', [path.join(__dirname, './questions.command.js')], null),
            i   = 1;
            
        cp.stdout.on('data', function(data) {
            if (i == 1) {
                expect(data)
                    .to.contain('firstname:');    
            }
            
            if (i == 2) {
                expect(data)
                    .to.contain('lastname:');
            }
            
            if (i == 3) {
                expect(data)
                    .to.contain('My name is chuck norris');
            }
                
            i++;
        });
        
        setTimeout(function() {
            cp.stdin.write('chuck\n');
        }, 500);
        
        setTimeout(function() {
            cp.stdin.write('norris\n');
            cp.stdin.end();
            done();
        }, 1000);
    });
});
