var test = require('tape').test;
var generate = require('../index.js');

test("string type with options", function (t) {
  var schema = {
    username : {
      type: 'string',
      opts: {
        min: 5,
        max: 10,
        match: '^[a-z ]+$'
      }
    }
  };

  t.throws(function () {
    generate(schema).username.marshal('bob')
  }, new Error('Value <bob> must be at least 5 characters at <object>'),
  'should throw when string is too short');

  t.throws(function () {
    generate(schema).username.marshal('bob smith the ultimate')
  }, new Error('Value <bob smith the ultimate> must be at most 10 characters at <object>'),
  'should throw when string is too long');

  t.equals(
    generate(schema).username.marshal('tom smith'),
    'tom smith',
    'should marshal a string of the right length');

  t.throws(function () {
    generate(schema).username.marshal('203943')
  }, new Error('Value <203943> must be match the pattern </^[a-z ]+$/> at <object>'),
  'should match pattern interpreted as regexp');

  t.end();
});
