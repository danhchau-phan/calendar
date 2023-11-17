import { CalendarEvent } from "./type";

export function daysInMonth(month: number, year: number) {
	return new Date(year, month, 0).getDate();
}

export function daysOfLastMonthWithinTheFirstWeek(month: number, year: number) {
	const firstWeekDayOfMonth = new Date(year, month - 1, 1).getDay();
	const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();
	return Array.from(
		{ length: firstWeekDayOfMonth },
		(val, idx) => lastDayOfLastMonth - idx
	).reverse();
}

export function daysOfNextMonthWithinTheLastWeek(month: number, year: number) {
	return Array.from({ length: 6 - new Date(year, month, 0).getDay() }, (val, idx) => idx + 1);
}

export function getLongMonthName(month: number) {
	const date = new Date(1, month - 1);

	return date.toLocaleString("en-US", {
		month: "long",
	});
}

export function getShortMonthName(month: number) {
	const date = new Date(1, month - 1);

	return date.toLocaleString("en-US", {
		month: "short",
	});
}

export function isToday(day: number, month: number, year: number) {
	const date = new Date(year, month - 1, day).toDateString();
	const today = new Date().toDateString();
	return date === today;
}

export function compareCalendarEvents(event1: CalendarEvent, event2: CalendarEvent) {
	return event1.day.getTime() - event2.day.getTime();
}

export function getNextMonthYear(month: number, year: number) {
	const nextMonth = new Date(year, month);
	return { month: nextMonth.getMonth() + 1, year: nextMonth.getFullYear() };
}

export function getLastMonthYear(month: number, year: number) {
	const lastMonth = new Date(year, month - 2);
	return { month: lastMonth.getMonth() + 1, year: lastMonth.getFullYear() };
}
