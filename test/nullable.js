var test = require('tap').test;
var generate = require('../index.js');

test("nullable type of kind string", function (t) {
  var types = generate({
    t : {type: 'nullable', kind: 'string'}
  });

  t.equal(types.t.marshal('a'), 'a')
  t.equal(types.t.marshal(null), null)
  t.end();
});

test("nullable type without kind", function (t) {
  t.throws(function () {
    generate({
      t : {type: 'nullable'}
    });
  }, Error('Nullable Requires "kind" Key in "t"'), 'should throw');
  t.end();
});
