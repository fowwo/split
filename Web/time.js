/**
 * Converts a number of milliseconds into a stopwatch format.
 * @param {Number} ms - The number of milliseconds.
 * @retuns The formatted time.
 */
function timeFormat(ms) {
	return `${Math.floor(ms / 1000 / 60)}:${padZeros(Math.floor(ms / 1000) % 60, 2)}.${padZeros(ms % 1000, 3)}`;
}

/**
 * Adds trailing zeros to the beginning of a number.
 * @param {Number | String} number - The number to be padded with zeros.
 * @param {Number} length - The maximum string length.
 * @returns The string padded with zeros.
 */
function padZeros(number, length) {
	var string = "" + number;
	while (string.length < length) {
		string = "0" + string;
	}
	return string;
}

function timeSince(time) {
	const now = (new Date).getTime();
	return now - time;
}

/**
 * Rounds a number of milliseconds to the nearest 50ms.
 * @param {Number} time - A number of milliseconds.
 * @returns The number of milliseconds rounded to the nearest 50ms.
 */
function roundToTick(time) { return Math.round(time / 50) * 50; }

/**
 * 
 * @param {Number} time - A number of milliseconds.
 * @returns A fo
 */
function timeAgo(time) {
	let since = timeSince(time);
	if (since < 60 * 1000) {
		let value = Math.floor(timeSince(time) / 1000);
		return `${value} second${value === 1 ? "" : "s"} ago`;
	} else if (since < 60 * 60 * 1000) {
		let value = Math.floor(timeSince(time) / (60 * 1000));
		return `${value} minute${value === 1 ? "" : "s"} ago`;
	} else if (since < 24 * 60 * 60 * 1000) {
		let value = Math.floor(timeSince(time) / (60 * 60 * 1000));
		return `${value} hour${value === 1 ? "" : "s"} ago`;
	} else if (since < 365.25 * 24 * 60 * 60 * 1000) {
		let value = Math.floor(timeSince(time) / (24 * 60 * 60 * 1000));
		return `${value} day${value === 1 ? "" : "s"} ago`;
	} else {
		let value = Math.floor(timeSince(time) / (365.25 * 24 * 60 * 60 * 1000));
		return `${value} year${value === 1 ? "" : "s"} ago`;
	}
}
