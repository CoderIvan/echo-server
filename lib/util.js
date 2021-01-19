const tldr = ((() => {
	const MAX = 1024
	return (json) => {
		if (json !== undefined && json !== null) {
			const string = JSON.stringify(json)
			return string.length > MAX ? `${string.substring(0, MAX)}...` : string
		}
		return ''
	}
})())

module.exports = {
	tldr,
}
