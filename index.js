var parser = require('odata-parser'),
  serialize = require('./util/serialize'),
  translations = require('./translations');

exports.type = 'plugin';
exports.name = 'odata';

exports.parse = function(req, res) {
  // Convert the query back to a querystring (parsing library expects that format) and parse it
  var ast = parser.parse(serialize(req.query)),
    esriQuery = {};

  // Loop through translations and apply those appropriate into a new query object
  translations.forEach(function(translation) {
    if(ast[translation.odata] !== undefined) {
      esriQuery[translation.esri] = translation.translate(ast[translation.odata]);
    }
  });
  req.query = esriQuery;
};
