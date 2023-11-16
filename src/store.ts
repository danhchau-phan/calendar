import { create } from "zustand";
import { CalendarState, MonthYear } from "./type";

export const useStore = create<CalendarState>((set) => ({
	eventFinalized: true,
	eventLength: 0,
	startAddingEvent: () => set({ eventFinalized: false }),
	finalizeEvent: () => set({ eventFinalized: true }),
	increaseEventLength: () =>
		set((state: CalendarState) => ({
			eventLength: state.eventLength + 1,
		})),
	decreaseEventLength: () =>
		set((state: CalendarState) => ({
			eventLength: state.eventLength - 1,
		})),
	displayedMonthYear: {
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
	},
	setDisplayedMonthYear: ({ month, year }: MonthYear) => {
		return month > 12
			? set((state: CalendarState) => ({ displayedMonthYear: { month: 1, year: year + 1 } }))
			: month < 1
			? set((state: CalendarState) => ({ displayedMonthYear: { month: 12, year: year - 1 } }))
			: set((state: CalendarState) => ({ displayedMonthYear: { month, year } }));
	},
}));
