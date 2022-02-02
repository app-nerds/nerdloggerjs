/* v0.2.0 */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// console-writer.js
var require_console_writer = __commonJS({
  "console-writer.js"(exports2, module2) {
    var ConsoleWriter2 = class {
      constructor() {
      }
      debug(message, callback) {
        console.log(message);
        callback();
      }
      info(message, callback) {
        console.info(message);
        callback();
      }
      warn(message, callback) {
        console.warn(message);
        callback();
      }
      error(message, callback) {
        console.error(message);
        callback();
      }
      fatal(message, callback) {
        console.error(message);
        callback();
      }
    };
    module2.exports = ConsoleWriter2;
  }
});

// log-levels.js
var require_log_levels = __commonJS({
  "log-levels.js"(exports2, module2) {
    var LogLevels2 = {
      DEBUG: { text: "debug", level: 1 },
      INFO: { text: "info", level: 2 },
      WARN: { text: "warn", level: 3 },
      ERROR: { text: "error", level: 4 },
      FATAL: { text: "fatal", level: 5 }
    };
    module2.exports = LogLevels2;
  }
});

// base-format.js
var require_base_format = __commonJS({
  "base-format.js"(exports2, module2) {
    var BaseFormat2 = {
      timestamp: "time",
      level: "level",
      message: "msg"
    };
    module2.exports = BaseFormat2;
  }
});

// date-time.js
var require_date_time = __commonJS({
  "date-time.js"(exports2, module2) {
    function now2() {
      const dt = new Date();
      const year = dt.getUTCFullYear();
      const month = dt.getUTCMonth() + 1;
      const day = dt.getUTCDate();
      const hour = dt.getUTCHours();
      const minute = dt.getUTCMinutes();
      const second = dt.getUTCSeconds();
      const milli = dt.getUTCMilliseconds();
      const result = `${year}-${("" + month).padStart(2, "0")}-${("" + day).padStart(2, "0")}T${("" + hour).padStart(2, "0")}:${("" + minute).padStart(2, "0")}:${("" + second).padStart(2, "0")}.${("" + milli).padStart(3, "0")}Z`;
      return result;
    }
    module2.exports = now2;
  }
});

// json-formatter.js
var require_json_formatter = __commonJS({
  "json-formatter.js"(exports2, module2) {
    var BaseFormat2 = require_base_format();
    var now2 = require_date_time();
    var LogLevels2 = require_log_levels();
    var JSONFormatter2 = class {
      constructor(config = BaseFormat2) {
        this.config = config;
      }
      format(message = "", level = LogLevels2.DEBUG, metadata = {}) {
        let payload = {};
        payload[this.config.timestamp] = now2();
        payload[this.config.level] = level.text;
        payload[this.config.message] = message;
        for (const key in metadata) {
          payload[key] = metadata[key];
        }
        return JSON.stringify(payload);
      }
    };
    module2.exports = JSONFormatter2;
  }
});

// logger.js
var ConsoleWriter = require_console_writer();
var LogLevels = require_log_levels();
var JSONFormatter = require_json_formatter();
var BaseFormat = require_base_format();
var now = require_date_time();
var Logger = class {
  constructor(minimumLevel = LogLevels.DEBUG, writers = [new ConsoleWriter()], format = new JSONFormatter()) {
    this._minimumLevel = minimumLevel;
    this._writers = writers;
    this._format = format;
  }
  get minimumLevel() {
    return this._minimumLevel;
  }
  set minimumLevel(value = LogLevels.DEBUG) {
    this._minimumLevel = value;
  }
  get writers() {
    return this._writers;
  }
  set writers(writers = []) {
    this._writers = [];
    for (let i = 0; i < writers.length; i++) {
      this._writers.push(writers[i]);
    }
  }
  get format() {
    return this._format;
  }
  set format(format = new JSONFormatter()) {
    this._format = format;
  }
  debug(message = "", metadata = {}) {
    if (!this._shouldWrite(LogLevels.DEBUG)) {
      return;
    }
    const formattedMessage = this._format.format(message, LogLevels.DEBUG, metadata);
    this._write(formattedMessage, LogLevels.DEBUG);
  }
  info(message = "", metadata = {}) {
    if (!this._shouldWrite(LogLevels.INFO)) {
      return;
    }
    const formattedMessage = this._format.format(message, LogLevels.INFO, metadata);
    this._write(formattedMessage, LogLevels.INFO);
  }
  warn(message = "", metadata = {}) {
    if (!this._shouldWrite(LogLevels.WARN)) {
      return;
    }
    const formattedMessage = this._format.format(message, LogLevels.WARN, metadata);
    this._write(formattedMessage, LogLevels.WARN);
  }
  error(message = "", metadata = {}) {
    if (!this._shouldWrite(LogLevels.ERROR)) {
      return;
    }
    const formattedMessage = this._format.format(message, LogLevels.ERROR, metadata);
    this._write(formattedMessage, LogLevels.ERROR);
  }
  fatal(message = "", metadata = {}) {
    if (!this._shouldWrite(LogLevels.FATAL)) {
      return;
    }
    const formattedMessage = this._format.format(message, LogLevels.FATAL, metadata);
    this._write(formattedMessage, LogLevels.FATAL);
  }
  _write(message, level) {
    return Promise.all(this._writers.map((writer) => {
      return new Promise((resolve, reject) => {
        writer[level.text](message, (errorResult) => errorResult ? reject(errorResult) : resolve(message));
      });
    }));
  }
  _shouldWrite(level = LogLevels.DEBUG) {
    if (level.level >= this._minimumLevel.level) {
      return true;
    }
    return false;
  }
};
module.exports = {
  Logger,
  LogLevels,
  ConsoleWriter,
  JSONFormatter,
  BaseFormat,
  now
};
