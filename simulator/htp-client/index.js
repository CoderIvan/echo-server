const request = require('request-promise-native')
const config = require('../../config')

const { getRandomText, getRandomTerminalText } = require('../constant')

const rule01 = () => ({
	path: '',
	body: getRandomText(),
})

const rule02 = () => ({
	path: '',
	body: getRandomTerminalText(),
})

const rule03 = () => ({
	path: `/ivan%20test%20${String(Math.floor(Math.random() * 100)).padStart(2, '0')}`,
	body: getRandomTerminalText(),
})

async function send() {
	await Promise.all([
		rule01, rule02, rule03,
	].map(async (rule) => {
		const { path, body } = rule()
		await request.post({
			url: `http://localhost:${config.source['http-server'].port}${path}`,
			method: 'POST',
			headers: { 'content-type': 'text/plain' },
			body,
		})
	}))
}

module.exports = {
	send,
}
