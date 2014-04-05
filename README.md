# lib-schema

## install

```bash
npm install --save lib-schema
```

## usage

Define a schema

```json
{
  "args": {"type": "array" , "kind": "string"},
  "envs": {"type": "map"   , "kind": "string"},
  "task": {"type": "struct", "props": {
      "exec" : "string",
      "args" : "args",
      "uid"  : "number",
      "gid"  : "string",
      "envs" : "envs"
    }, "require": ["exec", "args"]
  },
  "tasks": {"type": "array" , "kind": "task"},
  "job"  : {"type": "struct", "props": {
      "tasks": "tasks"
    }, "require": ["tasks"]
  }
}
```

Create a marshaller from the schema

```javascript
var schema = require('lib-schema');
var types  = schema(json);

var job = types.job.marshal({
  tasks: [
    {exec: 'ls', args: ['-al']}
  ]
});
// job is a validated object against the schema

types.job.marshal({
  tasks: [
    {exec: 'pwd'}
  ]
}); // throws because args is required parameter
```

## see also

- [lib-marshal](https://www.npmjs.org/package/lib-marshal)
