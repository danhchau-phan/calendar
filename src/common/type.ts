export type MonthYear = {
	month: number;
	year: number;
};

export type CalendarEvent = {
	eventId: string;
	eventLength: number;
	day: Date;
	title: string;
	placement: number;
};

export interface NewEventSlice {
	eventFinalized: boolean;
	eventLength: number | null;
	eventStartDayId: number | null;
	startAddingEvent: Function;
	finalizeEvent: Function;
	setEventLength: Function;
	setEventStartDayId: Function;
}

export interface DisplayedMonthYearSlice {
	displayedMonthYear: MonthYear;
	setDisplayedMonthYear: (my: MonthYear) => void;
}

export interface SavedEventsSlice {
	savedEvents: Record<number, Record<number, CalendarEvent[]>>;
	saveEvent: Function;
	removeSavedEvent: Function;
	occupiedSpaces: Record<number, Record<number, Record<number, number[]>>>; // year -> month -> dayId -> occupiedSpaces[]
}

export type CalendarState = DisplayedMonthYearSlice & NewEventSlice & SavedEventsSlice;

export type CalendarEventProps = {
	eventLength: number;
	dayId: number;
	eventStartDayId: number;
	title?: string;
	savedEvent?: boolean;
	eventPlacement?: number;
};

export type DayProps = {
	isCurrentMonth?: boolean;
	dayId: number;
	day: number;
	month: number;
	year: number;
	events: CalendarEvent[];
	numberOfUndisplayedEvents: number;
};

export type MonthProps = {
	month: number;
	year: number;
	savedEvents: Record<number, Record<number, CalendarEvent[]>>;
	occupiedSpaces: Record<number, Record<number, Record<number, number[]>>>;
};

export type SavedEventParams = {
	eventStartDayId: number;
	eventLength: number;
	day: number;
	month: number;
	year: number;
	title: string;
};
