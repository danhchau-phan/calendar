import { create } from "zustand";
import { CalendarState, MonthYear } from "./type";

export const useStore = create<CalendarState>((set) => ({
	eventFinalized: true,
	eventLength: 0,
	startAddingEvent: () => set({ eventFinalized: false }),
	finalizeEvent: () => set({ eventFinalized: true }),
	setEventLength: (length: number) =>
		set((state: CalendarState) => ({
			eventLength: length,
		})),
	displayedMonthYear: {
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
	},
	setEventStartDayId: (dayId: number) => set({ eventStartDayId: dayId }),
	eventStartDayId: null,
	events: [],
	setDisplayedMonthYear: ({ month, year }: MonthYear) => {
		return month > 12
			? set((state: CalendarState) => ({ displayedMonthYear: { month: 1, year: year + 1 } }))
			: month < 1
			? set((state: CalendarState) => ({ displayedMonthYear: { month: 12, year: year - 1 } }))
			: set((state: CalendarState) => ({ displayedMonthYear: { month, year } }));
	},
}));
