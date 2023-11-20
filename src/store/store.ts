import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CalendarState } from "../common/type";
import { createNewEventSlice } from "./newEventSlice";
import { createDisplayedMonthYearSlice } from "./displayedMonthYearSlice";
import { createSavedEventsSlice } from "./savedEventsSlice";
import { calendarStorage } from "./storage";

export const useBoundStore = create<CalendarState>()(
	persist(
		(...a) => ({
			...createNewEventSlice(...a),
			...createDisplayedMonthYearSlice(...a),
			...createSavedEventsSlice(...a),
		}),
		{
			name: "calendar-storage",
			storage: calendarStorage,
			partialize: (state) => ({
				savedEvents: state.savedEvents,
				displayedMonthYear: state.displayedMonthYear,
			}),
		}
	)
);
