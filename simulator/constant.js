const getRandomText = () => `Some bytes:${Math.random()}`

const TERMINALS = [
	{ sn: '0000000000', iccid: '90000000000000000000', imei: '900000000000000' },
	{ sn: '0000000001', iccid: '90000000000000000001', imei: '900000000000001' },
	{ sn: '0000000002', iccid: '90000000000000000002', imei: '900000000000002' },
	{ sn: '0000000003', iccid: '90000000000000000003', imei: '900000000000003' },
	{ sn: '0000000004', iccid: '90000000000000000004', imei: '900000000000004' },
	{ sn: '0000000005', iccid: '90000000000000000005', imei: '900000000000005' },
	{ sn: '0000000006', iccid: '90000000000000000006', imei: '900000000000006' },
	{ sn: '0000000007', iccid: '90000000000000000007', imei: '900000000000007' },
	{ sn: '0000000008', iccid: '90000000000000000008', imei: '900000000000008' },
	{ sn: '0000000009', iccid: '90000000000000000009', imei: '900000000000009' },
]

const getRandomTerminalText = () => {
	const terminal = TERMINALS[Math.floor(Math.random() * 10)]
	return `${JSON.stringify({
		...terminal,
		random: getRandomText(),
	})}`
}

module.exports = {
	getRandomText,
	getRandomTerminalText,
}
