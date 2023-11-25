import { StateCreator } from "zustand";
import {
	CalendarEvent,
	DisplayedMonthYearSlice,
	MonthYear,
	NewEventSlice,
	SavedEventParams,
	SavedEventsSlice,
} from "../common/type";
import { compareCalendarEvents } from "../common/dayUtils";
import { MAXIMUM_EVENTS_DISPLAYED_PER_ROW } from "../common/constants";
import { findIndexOfImmediateGreaterElement } from "../common/utils";

export const createSavedEventsSlice: StateCreator<
	DisplayedMonthYearSlice & NewEventSlice & SavedEventsSlice,
	[],
	[],
	SavedEventsSlice
> = (set) => ({
	savedEvents: {},
	saveEvent: ({ eventStartDayId, eventLength, day, month, year, title }: SavedEventParams) =>
		set((state: SavedEventsSlice) => {
			const event: Partial<CalendarEvent> & Pick<CalendarEvent, "day"> = {
				eventId: crypto.randomUUID(),
				eventLength,
				title,
				day: new Date(year, month - 1, day),
			};
			let placement = -1;
			do {
				placement++;
				let i = 0;
				while (i <= eventLength) {
					if (
						state.occupiedSpaces[year]?.[month]?.[eventStartDayId + i]?.[placement] === 0 ||
						state.occupiedSpaces[year]?.[month]?.[eventStartDayId + i]?.[placement] === undefined
					) {
						i++;
					} else break;
				}
				if (i === eventLength + 1) break;
			} while (placement + 1 < MAXIMUM_EVENTS_DISPLAYED_PER_ROW);

			const allEventsInMonth = [...(state.savedEvents[year]?.[month] ?? [])];
			const idx = findIndexOfImmediateGreaterElement(
				allEventsInMonth,
				event,
				compareCalendarEvents
			);

			return {
				savedEvents: {
					...state.savedEvents,
					[year]: {
						...(state.savedEvents[year] ?? {}),
						[month]: [
							...allEventsInMonth.slice(0, idx),
							{ ...event, placement } as CalendarEvent,
							...allEventsInMonth.slice(idx, allEventsInMonth.length),
						],
					},
				},
				occupiedSpaces: {
					...state.occupiedSpaces,
					[year]: {
						...state.occupiedSpaces[year],
						[month]: {
							...(state.occupiedSpaces[year]?.[month] ?? {}),
							...Array.from({ length: eventLength + 1 }, (_, idx) => eventStartDayId + idx).reduce(
								(acc, dayId) => ({
									...acc,
									[dayId]: Array.from({ length: MAXIMUM_EVENTS_DISPLAYED_PER_ROW }, (_, idx) =>
										idx === placement
											? (state.occupiedSpaces[year]?.[month]?.[dayId]?.[idx] ?? 0) + 1
											: state.occupiedSpaces[year]?.[month]?.[dayId]?.[idx] ?? 0
									),
								}),
								{}
							),
						},
					},
				},
			};
		}),
	removeSavedEvent: (eventId: string, { month, year }: MonthYear) =>
		set((state: SavedEventsSlice) => ({
			// TODO
		})),
	occupiedSpaces: {},
});
