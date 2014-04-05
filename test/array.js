var test = require('tap').test;
var generate = require('../index.js');

test("array type missing type key", function (t) {
  t.throws(function () {
    generate({
      t : {}
    });
  }, Error('Missing "type" Key in "t"'), 'should throw');
  t.end();
});

test("array type missing kind key", function (t) {
  t.throws(function () {
    generate({
      t : {type: 'array'}
    });
  }, Error('Array Requires "kind" Key in "t"'), 'should throw');
  t.end();
});

test("array type of kind string", function (t) {
  var types = generate({
    t : {type: 'array', kind: 'string'}
  });
  t.deepEqual(types.t.marshal(['a']), ['a'], 'should marshal array of string')
  t.end();
});
