'use strict';

const LOGLABEL = '[serverless-plugin-disable-events]';

class ServerlessPluginDisableEvents {
  constructor(serverless) {
    this.serverless = serverless;
    this.options = getConfig(serverless);

    this.hooks = {
      'before:package:compileEvents': this.beforePackageCompileEvents.bind(this),
    };
  }

  beforePackageCompileEvents() {
    const options = this.options;
    const functions = this.serverless.service.functions;
    for (const key in functions) {
      if (functions.hasOwnProperty(key) && shouldDisable(options, key)) {
        this.serverless.cli.log(`${LOGLABEL} Events DISABLED for function ${key}`);
        this.serverless.service.functions[key].events = [];
      }
    }
  }
}

/**
 * Determines if a value is a string or bool and if its value is true
 *
 * Different versions of serverless interpolate booleans/strings
 * in different ways, so we stringify it here for easier comparison
 */
function isTruthy(value) {
  return (typeof value === 'string' || typeof value === 'boolean') && `${value}` === 'true';
}

/**
 * Get the configuration for this plugin from custom settings
 */
function getConfig(serverless) {
  const options = serverless.service.custom['disableEvents'];
  return {
    disableAllEvents: isTruthy(options),

    // when disableEvents is set to an object, we can use this to set individual
    // function options
    functions: options,
  };
}

/**
 * Determine if the given function key should be disabled
 */
function shouldDisable(options, key) {
  if (options.disableAllEvents) {
    return true;
  }

  const funcOptions = options.functions[key];
  if (isTruthy(funcOptions)) {
    return true;
  }

  return false;
}

module.exports = ServerlessPluginDisableEvents;
