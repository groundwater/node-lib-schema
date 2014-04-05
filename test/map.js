var test = require('tap').test;
var generate = require('../index.js');

test("map type missing type key", function (t) {
  t.throws(function () {
    generate({
      t : {}
    });
  }, Error('Missing "type" Key in "t"'), 'should throw');
  t.end();
});

test("map type missing kind key", function (t) {
  t.throws(function () {
    generate({
      t : {type: 'map'}
    });
  }, Error('Map Requires "kind" Key in "t"'), 'should throw');
  t.end();
});

test("map type of kind string", function (t) {
  var types = generate({
    t : {type: 'map', kind: 'string'}
  });
  t.deepEqual(types.t.marshal({x: 'a'}), {x: 'a'}, 'should marshal map of string')
  t.end();
});
