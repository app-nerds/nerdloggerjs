const BaseFormat = require("./base-format.js");
const now = require("./date-time.js");
const LogLevels = require("./log-levels.js");

class JSONFormatter {
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

		return JSON.stringify(payload);
	}
}

module.exports = JSONFormatter;
