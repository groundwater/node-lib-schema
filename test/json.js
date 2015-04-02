var test = require('tape').test;
var generate = require('../index.js');

test("allow json type", function (t) {
  var validator = generate({
    t : {type: 'json'}
  });
  var out = validator.t.marshal({one: 1, two: 'two', three: null})
  t.equals(out.one, 1)
  t.equals(out.two, 'two')
  t.equals(out.three, null)
  t.end()
});

test("allow nesting json type", function(t) {
  var validator = generate({
    t : {type: 'json'},
    o : {type: 'struct', props: {
      a: 't',
      b: 'string'
    }}
  })
  var out = validator.o.marshal({a: {one: 1, two: 'two'}, b: 'bee'})
  t.equals(out.a.one, 1)
  t.equals(out.a.two, 'two')
  t.end()
})

test("allow json type in array", function(t) {
  var validator = generate({
    t : {type: 'array', kind: 'json'},
  })
  var json = {one: 1, two: 'two'}
  var out = validator.t.marshal([json, json])
  t.equals(out[0].one, 1)
  t.equals(out[0].two, 'two')
  t.end()
})

test("allow json type in struct", function(t) {
  var validator = generate({
    t : {type: 'struct', props: {
      a: 'json'
    }},
  })
  var json = {one: 1, two: 'two'}
  var out = validator.t.marshal({a: json})
  t.equals(out.a.one, 1)
  t.equals(out.a.two, 'two')
  t.end()
})
