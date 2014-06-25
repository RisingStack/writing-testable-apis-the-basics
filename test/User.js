var sinon = require('sinon');
var expect = require('chai').expect;

var mongoose = require('mongoose');
var handler = require('./../lib/User');
var User = mongoose.model('User');

describe('User', function() {
  it('#findUnicorns', function(done) {
    // test setup
    var unicorns = [ 'unicorn1', 'unicorn2' ];
    var req = { query: { world: '1' } };

    // mocking MongoDB
    sinon.stub(User, 'findUnicorns').yields(null, unicorns);

    // calling the test case
    handler(req, null, function(err, users) {
      // asserting
      expect(err).to.be.null;
      expect(users).to.eql(unicorns);
      // as our test is asynchronous, we have to tell mocha that it is finished
      done();
    })
  });
});