const dgram = require('dgram')
const util = require('util')
const config = require('../../config')

const { getRandomText, getRandomTerminalText } = require('../constant')

const rule01 = () => getRandomText()

const rule02 = () => getRandomTerminalText()

const rule03 = () => {
	const testNumber = String(Math.floor(Math.random() * 100)).padStart(2, '0')
	return `${`$ivan test ${testNumber}#`}${getRandomTerminalText()}`
}

async function send() {
	const client = dgram.createSocket('udp4')
	const sendAsync = util.promisify(client.send).bind(client)

	await Promise.all([
		rule01, rule02, rule03,
	].map((rule) => sendAsync(Buffer.from(rule()), config.source['udp-server'].port, 'localhost')))
}

module.exports = {
	send,
}
