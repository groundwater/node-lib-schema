'use strict';

var marshal = require('lib-marshal');
var fmt = require('util').format;

function generate(types) {
  var out = {
    string: new marshal.StringType(),
    number: new marshal.NumberType(),
  };

  Object.keys(types).forEach(function (key) {
    var type = types[key];

    if (!type.type) throw new Error(fmt('Missing "type" Key in "%s"', key));

    var kind;
    switch(type.type){
    case 'nullable':
      if (!type.kind)
        throw new Error(fmt('Nullable Requires "kind" Key in "%s"', key));
      kind = out[type.kind];
      out[key] = new marshal.Nullable(kind);
      break;
    case 'array':
      if (!type.kind)
        throw new Error(fmt('Array Requires "kind" Key in "%s"', key));
      kind = out[type.kind];
      if (!kind)
        throw new Error(fmt('Required Type "%s" Undefined in "%s"', type.kind, key));
      out[key] = new marshal.ArrayType(kind);
      break;
    case 'map':
      if (!type.kind)
        throw new Error(fmt('Map Requires "kind" Key in "%s"', key));
      kind = out[type.kind];
      if (!kind)
        throw new Error(fmt('Required Type "%s" Undefined in "%s"', type.kind, key));
      out[key] = new marshal.MapType(kind);
      break;
    case 'struct':
      out[key] = new marshal.StructType();
      if (!type.props) throw new Error(fmt('Struct Requires "props" Key in "%s"', key));
      Object.keys(type.props).forEach(function (name) {
        var keyType = type.props[name];

        if (!out[keyType])
          throw new Error(fmt('Required Type "%s" Undefined in "%s"', keyType, key));

        var required = type.require && (type.require.indexOf(name) > -1);

        if (required) out[key].addRequired(name, out[keyType]);
        else          out[key].add(name, out[keyType]);

      });
      break;
    default:
      throw new Error('Unknown Type');
    }
  });

  return out;
}

module.exports = generate;
