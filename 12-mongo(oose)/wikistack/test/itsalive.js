var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);


describe('Testing suite capabilities', function () {
    it('confirms setTimeout\'s timer accuracy', function (done) {
    var start = new Date();
    setTimeout(function () {
        var duration = new Date() - start;
        expect(duration).to.be.closeTo(1000, 50);
        done();
    }, 1000);
	});

    it('confirms basic arithmetic', function () {
        expect(2+2).to.equal(4);
    });

    it('will invoke a function once per element', function () {
        var arr = ['x','y','z'];
        function logNth (val, idx) {
            console.log('Logging elem #'+idx+':', val);
        }   
        logNth = chai.spy(logNth);
        arr.forEach(logNth);
        expect(logNth).to.have.been.called.exactly(arr.length);
    });

    it('returns the larger of two numbers', function () {
    var larger = Math.max(5,5);
    expect(larger).to.equal(5);
    });
    
});
