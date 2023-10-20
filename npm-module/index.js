const helper = require('../src/controllers/reading.controller')

async function getReadingsForDay(isDetailed) {
	// Default to today
	let parsedDate = new Date()
	if (req.params.date) {
		parsedDate = new Date(String(req.params.date))
	}
	const copticDate = fromGregorian(parsedDate)
	let data = {}

	// Default to sending back references only
	data.references = await getReferencesForCopticDate(parsedDate)

	// If asked for detailed readings, provide the text
	if (isDetailed === 'true') {
		data.text = await getReadingsForCopticDate(parsedDate)
	}

	/// Add non moveable celebrations
	const celebrations = getStaticCelebrationsForDay(parsedDate)
	return { ...data, celebrations, fullDate: copticDate }
}

module.exports = {
	getReadingsForDay,
}
