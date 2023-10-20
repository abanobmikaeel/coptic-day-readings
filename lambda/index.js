// For development/testing purposes
const copticio = require('coptic-io')

exports.handler = function (event, context, callback) {
	console.log('Running index.handler')
	console.log('==================================')
	console.log('event', event)
	console.log('==================================')
	console.log('Stopping index.handler')
	callback(null, event)
	// or
	// callback( 'some error type' );
}
