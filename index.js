var parser = require('odata-parser'),
  serialize = require('./util/serialize'),
  translations = require('./translations'),
  js2xmlparser = require('js2xmlparser');

exports.type = 'plugin';
exports.name = 'odata';

exports.parse = function(query) {
  if( ! Object.keys(query).length) return query;
  // Convert the query back to a querystring (parsing library expects that format) and parse it
  var ast = parser.parse(serialize(query)),
    esriQuery = {};

  //console.log(query, ast);

  // Loop through translations and apply those appropriate into a new query object
  translations.forEach(function(translation) {
    if(ast[translation.odata] !== undefined) {
      esriQuery[translation.esri] = translation.translate(ast[translation.odata]);
    }
  });
  //console.log(esriQuery);
  return esriQuery;
};

exports.output = function(geojson) {
  var records = geojson.features.map(function(feature) {
    return feature.properties;
  });
  return js2xmlparser('d', {properties: records});
}
