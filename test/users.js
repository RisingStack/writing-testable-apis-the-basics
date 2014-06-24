var sinon = require('sinon');
var expect = require('chai').expect;

var mongoose = require('mongoose');
var handler = require('../lib/User');
var User = mongoose.model('User');

describe('User', function() {
  it('returns all the users', function(done) {
    var allUsers = [ 'user1', 'user2' ];
    var req = { query: { world: '1' } };

    sinon.stub(User, 'findAllUsers').yields(null, allUsers);

    handler(req, null, function(err, users) {
      expect(err).to.be.null;
      expect(users).to.eql(allUsers);
      done();
    })
  })
});
