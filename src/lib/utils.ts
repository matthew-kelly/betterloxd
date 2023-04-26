export function format_money(amount: number) {
	if (amount === 0) {
		return 'Unknown';
	}

	let total: string;
	let mult = 'M';
	if (amount < 1000000) {
		total = (amount / 1e3).toFixed(2);
		mult = 'K';
	} else {
		total = (amount / 1e6).toFixed(2);
	}
	return '$' + total + mult + ' 🇺🇸';
}

export function getMaxValueKey(obj: { [key: string]: number }): string {
	return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
}
