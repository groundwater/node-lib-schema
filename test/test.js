var test = require('tap').test;
var generate = require('../index.js');

var types = {
  args : {type: 'array' , kind: 'string'},
  envs : {type: 'map'   , kind: 'string'},
  task : {type: 'struct', props: {
    exec : 'string',
    args : 'args',
    uid  : 'number',
    gid  : 'string',
    envs : 'envs',
  }},
  tasks : {type: 'array' , kind: 'task'},
  job   : {type: 'struct', props: {
    tasks : 'tasks',
  }},
};

test("this should work", function (t) {
  generate(types);
  t.end();
});

test("unknown type", function (t) {
  t.throws(function () {
    generate({
      a: {type: 'foo'}
    });
  }, new Error("Unknown Type"));
  t.end();
});
