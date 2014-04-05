var test = require('tap').test;
var generate = require('../index.js');

test("struct type with require", function (t) {
  t.throws(function () {
    generate({
      t : {type: 'struct', props: {
        s: 'string'
      }, require: ['s']}
    }).t.marshal({})
  }, 'throws on missing required properties');
  t.end();
});
