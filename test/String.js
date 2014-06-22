var expect = require('chai').expect;

describe('Math', function () {

  describe('#max', function () {

    it('returns the biggest number from the arguments', function () {
      var max = Math.max(1, 2, 10, 3);
      expect(max).to.equal(10);
    });

  });

});
