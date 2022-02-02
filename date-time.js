function now() {
	const dt = new Date();
	const year = dt.getUTCFullYear();
	const month = dt.getUTCMonth() + 1;
	const day = dt.getUTCDate();
	const hour = dt.getUTCHours();
	const minute = dt.getUTCMinutes();
	const second = dt.getUTCSeconds();
	const milli = dt.getUTCMilliseconds();
	const result = `${year}-${("" + month).padStart(2, "0")}-${(
		"" + day
	).padStart(2, "0")}T${("" + hour).padStart(2, "0")}:${("" + minute).padStart(
		2,
		"0"
	)}:${("" + second).padStart(2, "0")}.${(""+milli).padStart(3, "0")}Z`;

	return result;
}

module.exports = now;
