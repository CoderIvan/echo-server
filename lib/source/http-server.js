const Koa = require('koa')
const body = require('koa-body')
const Router = require('koa-router')
const util = require('../util')

module.exports = ({ logger, dao, tagName }) => {
	const app = new Koa()
	const router = new Router()

	app.use(body())

	const handler = async (ctx) => {
		const { request, response, params } = ctx
		logger.log(request.ip, request.protocol, request.method, request.url, '>>', util.tldr(request.body))
		const content = request.header['content-type'] === 'application/json'
			? JSON.stringify(request.body) : request.body

		let projectName
		if (params && params.projectName) {
			projectName = params.projectName
		}
		await dao.create(content, tagName, projectName)
		response.status = 200
	}

	router.post('/', handler)

	router.post('/:projectName', handler)

	app.use(router.routes(), router.allowedMethods())

	return {
		listen: async ({ port }) => {
			if (!port) {
				throw new Error(`Port is required, but get ${port}`)
			}

			return new Promise((resolve) => {
				app.listen(port, () => {
					logger.log('listen @ %s', port)
					resolve()
				})
			})
		},
	}
}
