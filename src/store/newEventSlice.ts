import { StateCreator } from "zustand";

import { DisplayedMonthYearSlice, NewEventSlice, SavedEventsSlice } from "../common/type";

export const createNewEventSlice: StateCreator<
	DisplayedMonthYearSlice & NewEventSlice & SavedEventsSlice,
	[],
	[],
	NewEventSlice
> = (set) => ({
	eventFinalized: true,
	eventLength: 0,
	setEventStartDayId: (dayId: number) => set({ eventStartDayId: dayId }),
	eventStartDayId: null,
	savedEvents: {},
	startAddingEvent: () => set({ eventFinalized: false, eventLength: 1 }),
	finalizeEvent: () => set({ eventFinalized: true, eventLength: 0 }),
	setEventLength: (length: number) =>
		set((state: NewEventSlice) => ({
			eventLength: length,
		})),
});
