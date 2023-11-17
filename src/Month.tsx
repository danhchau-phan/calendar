import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { NUMBER_OF_DAYS_IN_FIVE_WEEKS, NUMBER_OF_DAYS_IN_FOUR_WEEKS, WEEKDAYS } from "./constants";
import { MonthYear } from "./type";
import { daysInMonth, daysOfNextMonthWithinTheLastWeek, daysOfLastMonthWithinTheFirstWeek, getLastMonthYear, getNextMonthYear } from "./utils";
import EventPopUp from "./EventPopUp";
import Day from "./Day";

import "./Month.scss"
import { useStore } from "./store";

export default function Month({month, year}: MonthYear) {
  // const [addEvent, setAddEvent] = useState(true)

  const nextMonthYear = getNextMonthYear(month, year)
  const lastMonthYear = getLastMonthYear(month, year)
  const daysOfLastMonth = daysOfLastMonthWithinTheFirstWeek(month, year)
  const _daysInMonth: number = daysInMonth(month, year)
  const daysOfNextMonth = daysOfNextMonthWithinTheLastWeek(month, year)

  const totalDaysDisplayed = daysOfLastMonth.length + _daysInMonth + daysOfNextMonth.length
  
  const allEvents = useStore((state) => state.savedEvents)
  const thisMonthYearEvents = useMemo(() => allEvents[year]?.[month] ?? [], [allEvents, month, year])
  const nextMonthYearEvents = useMemo(() => allEvents[nextMonthYear.year]?.[nextMonthYear.month] ?? [], [allEvents, nextMonthYear])
  const lastMonthYearEvents = useMemo(() => allEvents[lastMonthYear.year]?.[lastMonthYear.month] ?? [], [allEvents, lastMonthYear])

  return (
    <div className="flex-grow flex flex-col mb-2 border-l">
      <div className="grid grid-cols-7 text-center text-sm">
        {WEEKDAYS.map((day) => <div className="border-r h-fit uppercase">{day}</div>)}
      </div>
      <div className={
        clsx("grid grid-cols-7 flex-grow leading-7",
        totalDaysDisplayed === NUMBER_OF_DAYS_IN_FOUR_WEEKS ? 
          "grid-rows-4" : totalDaysDisplayed === NUMBER_OF_DAYS_IN_FIVE_WEEKS ? "grid-rows-5" : "grid-rows-6")}>
        {daysOfLastMonth.map((day, id) => <Day dayId={id} day={day} month={lastMonthYear.month} year={lastMonthYear.year} events={lastMonthYearEvents.filter((e) => e.day.toDateString() === new Date(lastMonthYear.year, lastMonthYear.month-1, day).toDateString())}/>)}
        {Array.from({length: _daysInMonth}, (val, id) => id+1).map(
          (day, id) => <Day isCurrentMonth={true} dayId={id + daysOfLastMonth.length} day={day} month={month} year={year} events={thisMonthYearEvents.filter((e) => e.day.toDateString() === new Date(year, month-1, day).toDateString())}/>
        )}
        {daysOfNextMonth.map((day, id) => <Day dayId={id + daysOfLastMonth.length + _daysInMonth} day={day} month={nextMonthYear.month} year={nextMonthYear.year} events={nextMonthYearEvents.filter((e) => e.day.toDateString() === new Date(nextMonthYear.year, nextMonthYear.month-1, day).toDateString())}/>)}
      </div>
      {/* {addEvent && <EventPopUp setClosePopUp={setAddEvent}/>} */}
    </div>
  )
}
