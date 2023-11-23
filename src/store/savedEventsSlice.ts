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
			let placement = 0;
			while (placement < MAXIMUM_EVENTS_DISPLAYED_PER_ROW) {
				let i = 0;
				while (i < eventLength) {
					if (
						state.availableSpaces[year]?.[month]?.[eventStartDayId + i]?.[placement] === true ||
						state.availableSpaces[year]?.[month]?.[eventStartDayId + i]?.[placement] === undefined
					) {
						i++;
						continue;
					} else break;
				}
				if (i === eventLength) break;
				else placement++;
			}

			const allEventsInMonth = [...(state.savedEvents[year]?.[month] ?? {})];
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
							...allEventsInMonth
								.slice(idx, allEventsInMonth.length)
								.map((e) => ({ ...e, placement })),
						],
					},
				},
				availableSpaces: {
					...state.availableSpaces,
					[year]: {
						...state.availableSpaces[year],
						[month]: {
							...state.availableSpaces[year]?.[month],
							...Array.from({ length: eventLength }, (_, idx) => eventStartDayId + idx).reduce(
								(acc, dayId) => ({
									...acc,
									[dayId]: Array.from({ length: MAXIMUM_EVENTS_DISPLAYED_PER_ROW }, (_, idx) =>
										idx === placement
											? false
											: state.availableSpaces[year]?.[month]?.[dayId]?.[idx] ?? true
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
	availableSpaces: {},
});
