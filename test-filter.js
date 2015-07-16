var operators = {
  'eq': '=',
  'ne': '!=',
  'lt': '<',
  'lte': '<=',
  'gt': '>',
  'gte': '>='
};

var a = {
    "type": "lt",
    "left": {
        "type": "property",
        "name": "ZIP_CODE"
    },
    "right": {
        "type": "literal",
        "value": 19149
    }
};

var b = {
    "type": "and",
    "left": {
        "type": "lt",
        "left": {
            "type": "property",
            "name": "ZIP_CODE"
        },
        "right": {
            "type": "literal",
            "value": 19149
        }
    },
    "right": {
        "type": "eq",
        "left": {
            "type": "property",
            "name": "STATE"
        },
        "right": {
            "type": "literal",
            "value": "PA"
        }
    }
};
var enclose = function(val) {
  return typeof val === 'string' ? '\'' + val + '\'' : val;
};
var parse = function(val) {
  if(val.type === 'and' || val.type === 'or') {
    return [
      parse(val.left),
      val.type,
      parse(val.right)
    ].join(' ');
  }
  else {
    return [
      val.left.name,
      operators[val.type],
      enclose(val.right.value)
    ].join(' ')
  };
}

console.log(parse(b));
