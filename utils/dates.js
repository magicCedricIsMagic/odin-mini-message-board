function displayDate(date) {
	if (!date || !(date instanceof Date)) {
		return ""
	}
	const options = {
		day: "numeric",
		month: "long",
		year: "numeric",
	}
	return date.toLocaleDateString("fr-FR", options)
}

function displayHour(date) {
	if (!date || !(date instanceof Date)) {
		return ""
	}
	const options = {
		hour: "numeric",
		minute: "numeric",
	}
	return date.toLocaleTimeString("fr-FR", options)
}

module.exports = { displayDate, displayHour }
