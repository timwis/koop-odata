var ODataServer = require('simple-odata-server'),
  //query = require('simple-odata-server/lib/query'),
  parser = require('odata-parser'),
  translations = require('./translations');

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
  var ast = parser.parse(serialize(req.query)),
    esriQuery = {};
  //console.log('Parsing', req.query, ast);
  translations.forEach(function(translation) {
    if(ast[translation.ast] !== undefined) {
      esriQuery[translation.esri] = translation.translate(ast[translation.ast]);
    }
  });
  //console.log('Esri Query', esriQuery);

  res.json(esriQuery);
}
