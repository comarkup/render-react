#!/bin/bash
curl -X POST \
  http://localhost:3001/render \
  -H "Content-Type: application/json" \
  -d '{"code": "function ExampleComponent() { return React.createElement('\''div'\'', null, '\''Hello'\'') }"}'