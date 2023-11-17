export type MonthYear = {
	month: number;
	year: number;
};

export type CalendarEvent = {
	eventId: string;
	eventLength: number;
	eventStartDayId: number;
	day: Date;
};

export type CalendarState = {
	eventFinalized: boolean;
	eventLength: number;
	displayedMonthYear: MonthYear;
	eventStartDayId: number | null;
	savedEvents: Record<number, Record<number, CalendarEvent[]>>;
	startAddingEvent: Function;
	finalizeEvent: Function;
	setEventLength: Function;
	setDisplayedMonthYear: Function;
	setEventStartDayId: Function;
	saveEvent: Function;
	removeSavedEvent: Function;
};

export type CalendarEventProps = {
	eventLength: number;
	dayId: number;
	eventStartDayId: number;
	title?: string;
};
