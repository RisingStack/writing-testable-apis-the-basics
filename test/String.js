var expect = require('chai').expect;

describe('String\'s', function () {

  describe('indexOf method', function () {

    it('returns -1 if character is not found in the string', function (){
      expect('string'.indexOf('p')).to.equal(-1);
    });

  });

});
