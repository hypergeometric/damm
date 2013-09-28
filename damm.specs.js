var expect = require('chai').expect;
var damm = require('./damm');

describe('damm', function () {
  it('wikipedia example', function () {
    expect(damm.generate('572')).to.equal('4');
    expect(damm.append('572')).to.equal('5724');
  });

  it('many verifications', function () {
    for (var i = 0; i < 1000; i++) {
      expect(damm.verify(damm.append(i.toString()))).to.be.true;
    }
    for (var i = 500000; i < 501000; i++) {
      expect(damm.verify(damm.append(i.toString()))).to.be.true;
    }
    for (var i = 1234567890; i < (1234567890 + 1000); i++) {
      expect(damm.verify(damm.append(i.toString()))).to.be.true;
    }
  });

  it('example errors', function () {
    // wikipedia example
    expect(damm.verify('5724')).to.be.true;
    expect(damm.verify('5734')).to.be.false;
    expect(damm.verify('5324')).to.be.false;
    expect(damm.verify('5723')).to.be.false;
    expect(damm.verify('5274')).to.be.false;
    expect(damm.verify('7524')).to.be.false;

    // 111 => 1119
    expect(damm.verify('1119')).to.be.true;
    expect(damm.verify('1110')).to.be.false;
    expect(damm.verify('1129')).to.be.false;
    expect(damm.verify('1191')).to.be.false;

    // 0101 => 01010
    expect(damm.verify('01010')).to.be.true;
    expect(damm.verify('10010')).to.be.false;
    expect(damm.verify('11010')).to.be.false;
    expect(damm.verify('00010')).to.be.false;
    expect(damm.verify('01011')).to.be.false;
    expect(damm.verify('01110')).to.be.false;
    expect(damm.verify('01001')).to.be.false;
  });

  var inputs = ['1', '2', '123', '444', '572', '5678', '0000', '555555', '1234567890'];

  it('detect all single-digit errors', function () {
    inputs.forEach(function (input) {
      input = damm.append(input).split('');

      // Check each position
      for (var i = 0; i < input.length; i++) {
        var digit = input[i];
        // Replace and test each digit at position i in turn
        for (var r = 0; r < 10; r++) {
          var rinput = input.slice();
          rinput[i] = r;
          expect(damm.verify(rinput.join(''))).to.equal(digit == r);
        }
      }
    });
  });

  it('detect all adjacent transposition errors', function () {
    inputs.forEach(function (input) {
      input = damm.append(input).split('');

      // Check each pair
      for (var i = 0; i < input.length - 1; i++) {
        var rinput = input.slice();
        // Swap adjacent digits
        rinput[i] = input[i + 1];
        rinput[i + 1] = input[i];
        expect(damm.verify(rinput.join(''))).to.equal(input[i] === input[i + 1]);
      }
    });
  });

  it('throw on non-string', function (done) {
    try {
      damm.generate(123);
    } catch (e) {
      done();
    }
  });

  it('throw on non-digits', function (done) {
    try {
      damm.generate('1234X');
    } catch (e) {
      done();
    }
  });
});
