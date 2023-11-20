import { PersistStorage } from "zustand/middleware";
import superjson from "superjson";
import { CalendarEvent, MonthYear } from "../common/type";

export const calendarStorage: PersistStorage<{
	savedEvents: Record<number, Record<number, CalendarEvent[]>>;
	displayedMonthYear: MonthYear;
}> = {
	getItem: (name: string) => {
		const str = localStorage.getItem(name);
		if (!str) return null;
		return superjson.parse(str);
	},
	setItem: (name, value) => localStorage.setItem(name, superjson.stringify(value)),
	removeItem: (name: string) => localStorage.removeItem(name),
};
