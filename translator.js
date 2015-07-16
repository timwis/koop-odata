var operators = {
  'eq': '=',
  'ne': '!=',
  'lt': '<',
  'lte': '<=',
  'gt': '>',
  'gte': '>='
};

module.exports = [
  {
    ast: '$top',
    esri: 'resultRecordCount',
    translate: function(val) {
      return val;
    }
  },
  {
    ast: '$skip',
    esri: 'resultOffset',
    translate: function(val) {
      return val;
    }
  },
  {
    ast: '$select',
    esri: 'outFields',
    translate: function(val) {
      return val.join(', ');
    }
  },
  {
    ast: '$filter',
    esri: 'where',
    translate: function(val) {
      return [val.left.name, operators[val.type], right.value].join(' ');
    }
  }
]
