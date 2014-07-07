var restify = require('restify');
var server = restify.createServer();

server.get('/users/:id', function(req, res){
  res.json({
    id: 1,
    name: 'RisingStack'
  });
});

module.exports = server;
