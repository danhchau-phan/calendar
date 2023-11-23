import { faker } from "@faker-js/faker";
import { CalendarEvent, MonthYear } from "./type";

export function monthYearFactory(params?: Partial<MonthYear>) {
	return {
		month: faker.number.int({ min: 1, max: 12 }),
		year: faker.number.int({ min: 1950, max: 2050 }),
		...params,
	};
}

export function dateFactory(monthYear?: MonthYear) {
	return monthYear
		? faker.date.between({
				from: new Date(monthYear.year, monthYear.month - 1, 1),
				to: new Date(monthYear.year, monthYear.month, 0),
		  })
		: faker.date.anytime();
}

export function dateMonthYearFactory(monthYear?: MonthYear) {
	const date = dateFactory(monthYear);
	return { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
}

export function calendarEventFactory(params?: Partial<CalendarEvent>): CalendarEvent {
	return {
		eventId: faker.string.uuid(),
		eventLength: faker.number.int(),
		day: faker.date.anytime(),
		title: faker.string.alpha(),
		placement: faker.number.int(),
		...params,
	};
}

export function calendarEventsFactory(monthYear?: MonthYear): CalendarEvent[] {
	const numberOfEvents = faker.number.int({ min: 1, max: 1000 });
	return Array.from({ length: numberOfEvents }, (_, __) =>
		calendarEventFactory({
			day: dateFactory(monthYear),
		})
	);
}
