module.exports = {
	source: {
		'http-server': {
			port: Number(process.env.SOURCE_HTTP_SERVER_PORT || 80),
		},
		'udp-server': {
			port: Number(process.env.SOURCE_UDP_SERVER_PORT || 90),
		},
	},
	dao: {
		apiOptions: {
			accessKeyId: process.env.ALY_APIOPTIONS_ACCESSKEYID,
			secretAccessKey: process.env.ALY_APIOPTIONS_SECRETACCESSKEY,
			endpoint: process.env.ALY_APIOPTIONS_ENDPOINT
				|| 'http://cn-qingdao.log.aliyuncs.com'
				|| 'http://	cn-qingdao-intranet.log.aliyuncs.com',
			apiVersion: process.env.ALY_APIOPTIONS_APIVERSION || '2015-06-01',
		},
		sls: {
			projectName: process.env.ALY_SLS_PROJECTNAME || 'docker-alpha',
			logStoreName: process.env.ALY_SLS_LOGSTORENAME || 'echo-server',
		},
	},
}
