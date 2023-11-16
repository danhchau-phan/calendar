export type MonthYear = {
	month: number;
	year: number;
};

export type CalendarState = {
	eventFinalized: boolean;
	eventLength: number;
	displayedMonthYear: MonthYear;
	eventStartDayId: number | null;
	events: Event[];
	startAddingEvent: Function;
	finalizeEvent: Function;
	setEventLength: Function;
	setDisplayedMonthYear: Function;
	setEventStartDayId: Function;
};

export type CalendarEventProps = {
	eventLength: number;
	dayId: number;
	eventStartDayId: number | null;
	title?: string;
};
