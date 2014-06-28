var test = require('tap').test;
var generate = require('../index.js');

test("number type with options", function (t) {
  var schema = {
    age : {
      type: 'number',
      opts: {
        min: 0,
        max: 100
      }
    }
  };

  t.throws(function () {
    generate(schema).age.marshal(-1)
  }, new Error('Value <-1> must be greater than 0 at <object>'),
  'should throw when number is too small');

  t.throws(function () {
    generate(schema).age.marshal(101)
  }, new Error('Value <101> must be less than 100 at <object>'),
  'should throw when number is too large');

  t.end();
});
