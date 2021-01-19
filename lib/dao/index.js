const ALY = require('aliyun-sdk')
const Bluebird = require('bluebird')
const { default: Ajv } = require('ajv')

const ajv = new Ajv()
const configSchema = {
	type: 'object',
	properties: {
		apiOptions: {
			type: 'object',
			properties: {
				accessKeyId: {
					type: 'string',
				},
				secretAccessKey: {
					type: 'string',
				},
				endpoint: {
					type: 'string',
				},
				apiVersion: {
					type: 'string',
				},
			},
			required: ['accessKeyId', 'secretAccessKey', 'endpoint', 'apiVersion'],
		},
		sls: {
			type: 'object',
			properties: {
				projectName: {
					type: 'string',
				},
				logStoreName: {
					type: 'string',
				},
			},
			required: ['projectName', 'logStoreName'],
		},
	},
	required: ['apiOptions', 'sls'],
}

module.exports = (config) => {
	const validate = ajv.compile(configSchema)
	if (!validate(config)) {
		throw new Error(ajv.errorsText(validate.errors))
	}

	/**
	 * 服务入口 https://help.aliyun.com/document_detail/29008.html?spm=a2c4g.11186623.6.1161.4fc34695tVWGYP
	 *
	 * 例子 https://github.com/aliyun-UED/aliyun-sdk-js/tree/master/samples/sls
	 */
	const sls = new ALY.SLS(config.apiOptions)

	Bluebird.promisifyAll(sls)

	/**
	 * https://help.aliyun.com/document_detail/29026.html?spm=a2c4g.11186623.6.1115.500c446009izLz
	 *
	 * 向指定的 logStore 写入日志，并保持与原 dao 的接口一致
	 *
	 * @param {String} content
	 * @param {String} tagName
	 * @param {String} projectName
	 * @returns {Object}
	 */
	const create = async (content, tagName, projectName) => {
		const contents = [{
			key: 'content',
			value: String(content),
		}, {
			key: 'tagName',
			value: String(tagName),
		}]
		if (projectName) {
			contents.push({
				key: 'projectName',
				value: String(projectName),
			})
		}
		await sls.putLogsAsync({
			projectName: config.sls.projectName,
			logStoreName: config.sls.logStoreName,
			logGroup: {
				logs: [{
					time: Math.floor(new Date().getTime() / 1000),
					contents,
				}],
			},
		})
	}

	// 约定只通过接口上传日志，查询日志在网页中操作
	return {
		create,
	}
}
