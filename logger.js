const ConsoleWriter = require("./console-writer.js");
const LogLevels = require("./log-levels.js");
const JSONFormatter = require("./json-formatter.js");
const BaseFormat = require("./base-format.js");
const now = require("./date-time.js");

class Logger {
	constructor(
		minimumLevel = LogLevels.DEBUG,
		writers = [new ConsoleWriter()],
		format = new JSONFormatter()
	) {
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

		const formattedMessage = this._format.format(
			message,
			LogLevels.DEBUG,
			metadata
		);
		this._write(formattedMessage, LogLevels.DEBUG);
	}

	info(message = "", metadata = {}) {
		if (!this._shouldWrite(LogLevels.INFO)) {
			return;
		}

		const formattedMessage = this._format.format(
			message,
			LogLevels.INFO,
			metadata
		);
		this._write(formattedMessage, LogLevels.INFO);
	}

	warn(message = "", metadata = {}) {
		if (!this._shouldWrite(LogLevels.WARN)) {
			return;
		}

		const formattedMessage = this._format.format(
			message,
			LogLevels.WARN,
			metadata
		);
		this._write(formattedMessage, LogLevels.WARN);
	}

	error(message = "", metadata = {}) {
		if (!this._shouldWrite(LogLevels.ERROR)) {
			return;
		}

		const formattedMessage = this._format.format(
			message,
			LogLevels.ERROR,
			metadata
		);
		this._write(formattedMessage, LogLevels.ERROR);
	}

	fatal(message = "", metadata = {}) {
		if (!this._shouldWrite(LogLevels.FATAL)) {
			return;
		}

		const formattedMessage = this._format.format(
			message,
			LogLevels.FATAL,
			metadata
		);
		this._write(formattedMessage, LogLevels.FATAL);
	}

	/*****************************************************************************
	 * Private methods
	 ****************************************************************************/

	_write(message, level) {
		return Promise.all(
			this._writers.map((writer) => {
				return new Promise((resolve, reject) => {
					writer[level.text](message, (errorResult) =>
						errorResult ? reject(errorResult) : resolve(message)
					);
				});
			})
		);
	}

	_shouldWrite(level = LogLevels.DEBUG) {
		if (level.level >= this._minimumLevel.level) {
			return true;
		}

		return false;
	}
}

module.exports = {
	Logger,
	LogLevels,
	ConsoleWriter,
	JSONFormatter,
	BaseFormat,
	now,
};
