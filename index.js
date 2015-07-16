var ODataServer = require('simple-odata-server'),
  query = require('simple-odata-server/lib/query'),
  parser = require('odata-parser'),
  selectParser = require('./parser/select'),
  filterParser = require('./parser/filter');

exports.type = 'plugin';
exports.name = 'odata';

// Convert back to a string so the parsing library can handle it (TODO: not this)
var serialize = function(obj) {
  var queries = [];
  for(var i in obj) {
    if(obj.hasOwnProperty(i)) {
      queries.push(i + "=" + obj[i]);
    }
  }
  return queries.join('&');
};

exports.parse = function(req, res) {
  var ast = parser.parse(serialize(req.query));
  console.log('Parsing', req.query, ast);

  res.json(ast);
}

var translate = function(ast) {
  var query = {};

  //TODO: Call translator.js
}
