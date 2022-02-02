const { Logger, LogLevels } = require("./dist/logger.js");

const logger = new Logger(LogLevels.INFO);
logger.debug("this is a test");
logger.info("test #2");
logger.error("oh no!", {
	who: "Adam",
	message_id: "abcdefg",
});
