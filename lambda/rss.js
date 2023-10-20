// This lambda function is used to generate XML files for consumption by an RSS feed subscription to
// It will run with every new deployment to main
const builder = require('xmlbuilder')
// import the npm module

exports.handler = async (event) => {
	try {
		// Sample data for calendar events (replace with your actual data source)
		const calendarEvents = [
			{
				title: 'Event 1',
				date: '2023-10-25',
				description: 'Description of Event 1',
			},
			{
				title: 'Event 2',
				date: '2023-11-05',
				description: 'Description of Event 2',
			},
			// Add more events as needed
		]

		// Create an XML document using the 'xmlbuilder' library
		const xml = builder
			.create('rss', { version: '1.0' })
			.att('xmlns:atom', 'http://www.w3.org/2005/Atom')
			.ele('channel')
			.ele('title', 'Calendar Events RSS Feed')
			.ele('link', 'https://your-calendar-website.com')
			.ele('description', 'Main Calendar Events Feed')

		// Generate XML items for each calendar event
		calendarEvents.forEach((event) => {
			xml
				.ele('item')
				.ele('title', event.title)
				.ele('description', event.description)
				.ele('pubDate', event.date)
		})

		// Convert the XML document to a string
		const xmlString = xml.end({ pretty: true })

		return {
			statusCode: 200,
			body: xmlString,
			headers: {
				'Content-Type': 'application/xml',
			},
		}
	} catch (error) {
		console.error('Error:', error)
		return {
			statusCode: 500,
			body: 'Internal Server Error',
		}
	}
}
