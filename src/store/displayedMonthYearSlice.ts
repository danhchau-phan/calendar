import { StateCreator } from "zustand";
import {
	DisplayedMonthYearSlice,
	MonthYear,
	NewEventSlice,
	SavedEventsSlice,
} from "../common/type";

export const createDisplayedMonthYearSlice: StateCreator<
	DisplayedMonthYearSlice & NewEventSlice & SavedEventsSlice,
	[],
	[],
	DisplayedMonthYearSlice
> = (set) => ({
	displayedMonthYear: {
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
	},
	setDisplayedMonthYear: ({ month, year }: MonthYear) => {
		return month > 12
			? set((state: DisplayedMonthYearSlice) => ({
					displayedMonthYear: { month: 1, year: year + 1 },
			  }))
			: month < 1
			? set((state: DisplayedMonthYearSlice) => ({
					displayedMonthYear: { month: 12, year: year - 1 },
			  }))
			: set((state: DisplayedMonthYearSlice) => ({ displayedMonthYear: { month, year } }));
	},
});
