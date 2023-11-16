export type MonthYear = {
	month: number;
	year: number;
};

export type CalendarState = {
	eventFinalized: boolean;
	eventLength: number;
	increaseEventLength: Function;
	decreaseEventLength: Function;
	startAddingEvent: Function;
	finalizeEvent: Function;
	displayedMonthYear: MonthYear;
	setDisplayedMonthYear: Function;
};
