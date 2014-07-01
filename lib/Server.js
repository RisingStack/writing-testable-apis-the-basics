var express = require('express');
var app = express();

app.get('/users/:id', function(req, res){
  res.json({
    id: 1,
    name: 'RisingStack'
  });
});

module.exports = app;
