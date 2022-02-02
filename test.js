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
