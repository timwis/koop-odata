var operators = {
  'eq': '=',
  'ne': '!=',
  'lt': '<',
  'lte': '<=',
  'gt': '>',
  'gte': '>='
};

var enclose = function(val) {
  return typeof val === 'string' ? '\'' + val + '\'' : val;
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
      if(val.type === 'and' || val.type === 'or') {
        return [
          this.translate(val.left),
          val.type,
          this.translate(val.right)
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
  }
]
