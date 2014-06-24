var sinon = require('sinon');
var expect = require('chai').expect;

var mongoose = require('mongoose');
var handler = require('./../lib/User');
var User = mongoose.model('User');

describe('unit', function() {
  it('is great', function(done) {
    var unicorns = [ 'unicorn1', 'unicorn2' ];
    var req = { query: { world: '1' } };

    sinon.stub(User, 'findUnicorns').yields(null, unicorns);

    handler(req, null, function(err, users) {
      expect(err).to.be.null;
      expect(users).to.eql(unicorns);
      done();
    })
  })
});
