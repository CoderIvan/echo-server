const MyConsole = require('@z-ivan/console')

const daoFactory = require('./lib/dao')

const config = require('./config')

const hackConsole = new MyConsole()
const logger = hackConsole.createContext()
logger.addPrefix('ECHO SERVER')

const httpServer = require('./lib/source/http-server')
const udpServer = require('./lib/source/udp-server')

async function start() {
	const dao = daoFactory(config.dao)

	const sourceLogger = logger.createContext()
	sourceLogger.addPrefix('SOURCE')

	await Promise.all([
		['http-server', httpServer],
		['udp-server', udpServer],
	].map(async ([serverName, createServer]) => {
		const serverLogger = sourceLogger.createContext()
		serverLogger.addPrefix(serverName.toUpperCase())
		const server = createServer({ logger: serverLogger, dao, tagName: serverName })
		await server.listen(config.source[serverName])
	}))

	sourceLogger.log('All services start finish')
}

start()
