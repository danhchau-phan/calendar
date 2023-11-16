export type MonthYear = {
	month: number;
	year: number;
};

export type Event = {
	startDayId: number;
	length: number;
	title: string;
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
