export function percentDifferent(asset, coin) {
	return +(100 * Math.abs((asset - coin) / ((asset + coin) / 2))).toFixed(2)
}

export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.substr(1)
}
