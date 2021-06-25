serverless-plugin-disable-events
-----------------------

[![npm version](https://badge.fury.io/js/serverless-plugin-disable-events.svg)](https://badge.fury.io/js/serverless-plugin-disable-events)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A serverless plugin for selectively disabling events.

The lack of YAML conditionals makes it difficult to disable events based on stage, env vars, or other conditions.
Developers often have to resort to complicated YAML anchor gymnastics to disable function events in unqanted environments.

This plugin allows you to disable events based on a boolean value for all functions, or selected functions.

## Usage

To disable all events for all functions. The value can be a string, boolean, or interpolated value.

```yaml
plugins:
  - serverless-plugin-disable-events

custom:
  disableEvents: true
```

To disable events for specific functions

```yaml
plugins:
  - serverless-plugin-disable-events

custom:
  my-function-name: true
  my-other-function: ${env:DISABLE_EVENTS}

functions:
  my-function-name: ...
  my-other-function: ...
```
