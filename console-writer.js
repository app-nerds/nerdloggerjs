class ConsoleWriter {
	constructor() {}

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
}

module.exports = ConsoleWriter;
