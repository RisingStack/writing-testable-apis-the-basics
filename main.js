'use strict';

var http = require('http');
var app = require('./lib/Server');

http.createServer(app).listen(3000, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('Server is running at port 3000');
});
