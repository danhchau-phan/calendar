export type MonthYear = {
	month: number;
	year: number;
};

export type CalendarEvent = {
	eventId: string;
	eventLength: number;
	day: Date;
	title: string;
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

export type DayProps = {
	isCurrentMonth?: boolean;
	dayId: number;
	day: number;
	month: number;
	year: number;
	events: CalendarEvent[];
};

export type MonthProps = {
	month: number;
	year: number;
	savedEvents: Record<number, Record<number, CalendarEvent[]>>;
};

export type SavedEventParams = {
	eventLength: number;
	day: number;
	month: number;
	year: number;
	title: string;
};
