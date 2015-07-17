/**
 * Converts a javascript object to a querystring
 * ex. {a: "b", c: "d"} becomes a=b&c=d
 */

module.exports = function(obj) {
  var queries = [];
  for(var i in obj) {
    if(obj.hasOwnProperty(i)) {
      queries.push(i + "=" + obj[i]);
    }
  }
  return queries.join('&');
};
