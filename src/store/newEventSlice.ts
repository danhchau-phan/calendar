import { StateCreator } from "zustand";

import { DisplayedMonthYearSlice, NewEventSlice, SavedEventsSlice } from "../common/type";

export const createNewEventSlice: StateCreator<
	DisplayedMonthYearSlice & NewEventSlice & SavedEventsSlice,
	[],
	[],
	NewEventSlice
> = (set) => ({
	eventFinalized: true,
	eventLength: null,
	setEventStartDayId: (dayId: number) => set({ eventStartDayId: dayId }),
	eventStartDayId: null,
	startAddingEvent: () => set({ eventFinalized: false, eventLength: 1 }),
	finalizeEvent: () => set({ eventFinalized: true }),
	setEventLength: (length: number | null) =>
		set((state: NewEventSlice) => ({
			eventLength: length,
		})),
});
