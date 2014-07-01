'use strict';

var hippie = require('hippie');

var server = require('../../lib/Server');

describe('Server', function () {

  describe('/users endpoint', function () {

    it('returns a user based on the id', function (done) {
      hippie(server)
        .json()
        .get('/users/1')
        .expectStatus(200)
        .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
    });

  });

});
