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
    }
  },
  "tasks": {"type": "array" , "kind": "task"},
  "job"  : {"type": "struct", "props": {
      "tasks": "tasks"
    }
  }
}
```

Create a marshaller from the schema

```javascript
var schema = require('lib-schema');
var types  = schema(json);
```

## see also

- [lib-marshal](https://www.npmjs.org/package/lib-marshal)
