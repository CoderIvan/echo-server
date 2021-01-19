const httpJsonClient = require('./htp-client')
const udpTextClient = require('./udp-client')

function send() {
	return Promise.all([
		httpJsonClient.send(),
		udpTextClient.send(),
	])
}

function start(num) {
	let count = 0
	const circle = () => {
		send().then(() => {
			count += 1
			if (num && num > 0 && count > num) {
				return
			}
			setTimeout(() => {
				circle()
			}, 5000)
		})
	}
	circle()
}

start()
