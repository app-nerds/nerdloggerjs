# Nerd Logger JS

A simple, no dependency, configurable logger for NodeJS. 

## Install

Add the following line to your **.npmrc** file. 

`@app-nerds:registry=https://npm.pkg.github.com`

Add the following to your **.yarnrc** file.

`"@app-nerds:registry" "https://npm.pkg.github.com"`

```bash
yarn install @app-nerds/nerdloggerjs
```

## Getting Started

Basic usage is simple.

```javascript
const { Logger } = require("nerdloggerjs");
const logger = new Logger();

logger.debug("this is a test");

logger.info("test #2");

logger.error("this error has additional metadata", {
  who: "Adam",
  message_id: "abcdefg",
});

// Output would be:

// {"time":"2022-02-02T20:57:11.821Z","level":"debug","msg":"this is a test"}
// {"time":"2022-02-02T20:57:11.824Z","level":"info","msg":"test #2"}
// {"time":"2022-02-02T20:57:11.825Z","level":"error","msg":"oh no!","who":"Adam","message_id":"abcdefg"}
```

### Log Levels

Nerd Logger support what you'd expect for log levels. You can configure the logger to only write a log entry if it is equal to or higher than a minimum log level. So for example, if you don't want to see debug logs in your production system you would configure your logger like so.

```javascript
const { Logger, LogLevels } = require("nerdloggerjs");
const logger = new Logger(LogLevels.INFO);

logger.debug("this one won't show up");
logger.info("this one will");
```

Valid levels are:

* DEBUG
* INFO
* WARN
* ERROR
* FATAL

### Writers

By default logs are written to the console. This is done by the default *writer*, which is **ConsoleWriter**. You can however create your own writer to do what you want. A writer must implement the following methods:

* debug
* info
* warn
* error
* fatal

Each method is responsible for performing the *write* action. This could be sending the log entry to a file, or to a third party service. Whatever you want. When done you must call the *callback* method. If you provide an argument to the *callback* method, this will be treated as an error. Here is an example that prepends all log entries with `HA! - `.

```javascript
const { Logger, LogLevels } = require("nerdloggerjs");

class ExampleWriter {
  constructor() {}
  
  debug(message, callback) {
    console.log(`HA! - ${message}`);
    callback();
  }
  
  info(message, callback) {
    console.info(`HA! - ${message}`);
    callback();
  }
  
  warn(message, callback) {
    console.warn(`HA! - ${message}`);
    callback();
  }
  
  error(message, callback) {
    console.error(`HA! - ${message}`);
    callback();
  }
  
  fatal(message, callback) {
    console.error(`HA! - ${message}`);
    callback();
  }
}

const logger = new Logger(LogLevels.DEBUG, [new ExampleWriter()]);

logger.debug("this is a test");
logger.info("test #2");
logger.error("oh no!", {
  who: "Adam",
  message_id: "abcdefg",
});

// Output would be:

// HA! - {"time":"2022-02-02T20:45:43.649Z","level":"debug","msg":"this is a test"}
// HA! - {"time":"2022-02-02T20:45:43.653Z","level":"info","msg":"test #2"}
// HA! - {"time":"2022-02-02T20:45:43.653Z","level":"error","msg":"oh no!","who":"Adam","message_id":"abcdefg"}
```

### Formatters

By default all log entries are in JSON format. This is not only human-readable, but also machine-readable, which is useful for log aggregation and searching.

#### Customizing the JSON Formatter

You can customize the built-in JSON formatter a little bit. Let's say you didn't like the default key names for the time, level, and message. Here's how you would change it.

```javascript
const { Logger, LogLevels, JSONFormatter } = require("./dist/logger.js");

const formatConfig = {
	timestamp: "when",
	level: "how high",
	message: "payload",
};

const formatter = new JSONFormatter(formatConfig);
const logger = new Logger(LogLevels.DEBUG);
logger.format = formatter;

logger.debug("this is a test");
logger.info("test #2");
logger.error("oh no!", {
  who: "Adam",
  message_id: "abcdefg",
});

// Output would be:

// {"when":"2022-02-02T20:52:54.913Z","how high":"debug","payload":"this is a test"}
// {"when":"2022-02-02T20:52:54.917Z","how high":"info","payload":"test #2"}
// {"when":"2022-02-02T20:52:54.917Z","how high":"error","payload":"oh no!","who":"Adam","message_id":"abcdefg"}
```

#### Custom Formatter

You can also create your own formatter. Here's an example where log entries are plain text, tab separated.

```javascript
const { Logger, LogLevels, BaseFormat, now } = require("./dist/logger.js");

class TextFormatter {
  constructor(config = BaseFormat) {
    this.config = config;
  }
  
  format(message = "", level = LogLevels.DEBUG, metadata = {}) {
    let payload = {};
    
    payload[this.config.timestamp] = now();
    payload[this.config.level] = level.text;
    payload[this.config.message] = message;
    
    for (const key in metadata) {
      payload[key] = metadata[key];
    }
    
    let result = [];
    
    for (const key in payload) {
      result.push(`${key}=${payload[key]}`);
    }
    
    return result.join("\t");
  }
}

const logger = new Logger(LogLevels.DEBUG);
logger.format = new TextFormatter();

logger.debug("this is a test");
logger.info("test #2");
logger.error("oh no!", {
  who: "Adam",
  message_id: "abcdefg",
});

// Output would be:

// time=2022-02-02T21:04:21.230Z	level=debug	msg=this is a test
// time=2022-02-02T21:04:21.233Z	level=info	msg=test #2
// time=2022-02-02T21:04:21.234Z	level=error	msg=oh no!	who=Adam	message_id=abcdefg
```

## License

MIT License

Copyright (c) 2022 App Nerds

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

