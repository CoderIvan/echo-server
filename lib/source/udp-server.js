const dgram = require('dgram')
const util = require('../util')

const server = dgram.createSocket('udp4')

module.exports = ({ logger, dao, tagName }) => {
	server.on('message', (buffer, { address }) => {
		let content = buffer.toString()
		logger.log(address, 'udp', '>>', util.tldr(content))

		const startIndex = content.indexOf('$')
		const endIndex = content.indexOf('#')

		let projectName
		if (startIndex === 0 && endIndex > -1) {
			projectName = content.slice(1, endIndex)
			content = content.slice(endIndex + 1)
		}

		dao.create(content, tagName, projectName)
	})

	return {
		listen: async ({ port }) => {
			if (!port) {
				throw new Error(`Port is required, but get ${port}`)
			}

			return new Promise((resolve) => {
				server.bind(port, () => {
					logger.log('listen @ %s', port)
					resolve()
				})
			})
		},
	}
}
