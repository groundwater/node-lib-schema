var test = require('tap').test;
var generate = require('../index.js');

test("struct type missing props key", function (t) {
  t.throws(function () {
    generate({
      t : {type: 'struct'}
    });
  }, Error('Struct Requires "props" Key in "t"'), 'should throw');
  t.end();
});

test("struct type with no props", function (t) {
  var types = generate({
    t : {type: 'struct', props: {}}
  });
  var out = types.t.marshal({})
  t.deepEquals(out, {}, 'marshals empty object')
  t.end();
});

test("struct type with single prop", function (t) {
  var types = generate({
    t : {type: 'struct', props: {
      str: 'string'
    }}
  });
  var out = types.t.marshal({str: 'hello'})
  t.deepEquals(out, {str: 'hello'}, 'accepts property')
  t.end();
});

test("struct type with no props", function (t) {
  var types = generate({
    t : {type: 'struct', props: {}}
  });
  var out = types.t.marshal({str: 'hello'})
  t.deepEquals(out, {}, 'strips undefined properties')
  t.end();
});

test("struct type with single prop", function (t) {
  var types = generate({
    t : {type: 'struct', props: {}}
  });
  var out = types.t.marshal({})
  t.deepEquals(out, {}, 'allows missing properties')
  t.end();
});
