export function daysInMonth(month: number, year: number) {
	return new Date(year, month, 0).getDate();
}

export function daysOfLastMonthWithinTheWeek(month: number, year: number) {
	const firstWeekDayOfMonth = new Date(year, month - 1, 1).getDay();
	const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();
	return Array.from(
		{ length: firstWeekDayOfMonth },
		(val, idx) => lastDayOfLastMonth - idx
	).reverse();
}

export function daysOfNextMonthWithinTheWeek(month: number, year: number) {
	return Array.from({ length: 6 - new Date(year, month, 0).getDay() }, (val, idx) => idx + 1);
}

export function getMonthName(month: number, year: number) {
	const date = new Date(year, month - 1);

	return date.toLocaleString("en-US", {
		month: "long",
	});
}
