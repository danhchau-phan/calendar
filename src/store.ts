import { create } from "zustand";
import { CalendarEvent, CalendarState, MonthYear } from "./type";
import { compareCalendarEvents } from "./utils";

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
	savedEvents: {},
	setDisplayedMonthYear: ({ month, year }: MonthYear) => {
		return month > 12
			? set((state: CalendarState) => ({ displayedMonthYear: { month: 1, year: year + 1 } }))
			: month < 1
			? set((state: CalendarState) => ({ displayedMonthYear: { month: 12, year: year - 1 } }))
			: set((state: CalendarState) => ({ displayedMonthYear: { month, year } }));
	},
	saveEvent: (
		eventLength: number,
		eventStartDayId: number,
		day: number,
		month: number,
		year: number
	) =>
		set((state: CalendarState) => {
			const event: CalendarEvent = {
				eventId: crypto.randomUUID(),
				eventLength,
				eventStartDayId,
				day: new Date(year, month - 1, day),
			};
			if (state.savedEvents[year] === undefined)
				return { savedEvents: Object.assign(state.savedEvents, { year: { month: [event] } }) };
			else if (state.savedEvents[year][month] === undefined)
				return {
					savedEvents: Object.assign(
						state.savedEvents,
						Object.assign(state.savedEvents[year], { month: [event] })
					),
				};
			return {
				savedEvents: Object.assign(
					state.savedEvents,
					Object.assign(state.savedEvents[year], {
						month: [...state.savedEvents[year][month], event].sort(compareCalendarEvents),
					})
				),
			};
		}),
	removeSavedEvent: (eventId: string, { month, year }: MonthYear) =>
		set((state: CalendarState) => ({
			savedEvents: Object.assign(
				state.savedEvents,
				Object.assign(state.savedEvents[year], {
					month: state.savedEvents[year][month].filter((event) => event.eventId !== eventId),
				})
			),
		})),
}));
