import { StateCreator } from "zustand";
import {
	CalendarEvent,
	DisplayedMonthYearSlice,
	MonthYear,
	NewEventSlice,
	SavedEventParams,
	SavedEventsSlice,
} from "../common/type";
import { compareCalendarEvents } from "../common/utils";

export const createSavedEventsSlice: StateCreator<
	DisplayedMonthYearSlice & NewEventSlice & SavedEventsSlice,
	[],
	[],
	SavedEventsSlice
> = (set) => ({
	savedEvents: {},
	saveEvent: ({ eventLength, day, month, year, title }: SavedEventParams) =>
		set((state: SavedEventsSlice) => {
			const event: CalendarEvent = {
				eventId: crypto.randomUUID(),
				eventLength,
				title,
				day: new Date(year, month - 1, day),
			};
			if (state.savedEvents[year] === undefined)
				return {
					savedEvents: Object.assign({}, state.savedEvents, { [year]: { [month]: [event] } }),
				};
			else if (state.savedEvents[year][month] === undefined)
				return {
					savedEvents: Object.assign({}, state.savedEvents, {
						[year]: Object.assign({}, state.savedEvents[year], { [month]: [event] }),
					}),
				};
			return {
				savedEvents: Object.assign({}, state.savedEvents, {
					[year]: Object.assign({}, state.savedEvents[year], {
						[month]: [...state.savedEvents[year][month], event].sort(compareCalendarEvents),
					}),
				}),
			};
		}),
	removeSavedEvent: (eventId: string, { month, year }: MonthYear) =>
		set((state: SavedEventsSlice) => ({
			savedEvents: Object.assign(
				{},
				state.savedEvents,
				Object.assign({}, state.savedEvents[year], {
					[month]: state.savedEvents[year][month].filter((event) => event.eventId !== eventId),
				})
			),
		})),
});
