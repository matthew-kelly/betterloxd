export function format_money(amount: number) {
	if (amount === 0) {
		return 'Unknown';
	}

	let total: string;
	let mult = 'M';
	if (amount < 1000000) {
		total = (amount / 1e3).toFixed(2);
		console.log(amount, total);
		mult = 'K';
	} else {
		total = (amount / 1e6).toFixed(2);
	}
	return '$' + total + mult + ' 🇺🇸';
}
