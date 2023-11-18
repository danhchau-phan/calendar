import React, { useMemo } from "react";
import clsx from "clsx";
import { NUMBER_OF_DAYS_IN_FIVE_WEEKS, NUMBER_OF_DAYS_IN_FOUR_WEEKS, WEEKDAYS } from "../common/constants";
import { MonthProps } from "../common/type";
import { daysInMonth, daysOfNextMonthWithinTheLastWeek, daysOfLastMonthWithinTheFirstWeek, getLastMonthYear, getNextMonthYear } from "../common/utils";
import EventPopUp from "../EventPopUp/EventPopUp";
import Day from "../Day/Day";

import "./Month.scss"

export default function Month({month, year, savedEvents}: MonthProps) {
  // const [addEvent, setAddEvent] = useState(true)

  const nextMonthYear = getNextMonthYear(month, year)
  const lastMonthYear = getLastMonthYear(month, year)
  const daysOfLastMonth = daysOfLastMonthWithinTheFirstWeek(month, year)
  const _daysInMonth: number = daysInMonth(month, year)
  const daysOfNextMonth = daysOfNextMonthWithinTheLastWeek(month, year)

  const totalDaysDisplayed = daysOfLastMonth.length + _daysInMonth + daysOfNextMonth.length
  
  const thisMonthYearEvents = useMemo(() => savedEvents[year]?.[month] ?? [], [savedEvents, month, year])
  const nextMonthYearEvents = useMemo(() => savedEvents[nextMonthYear.year]?.[nextMonthYear.month] ?? [], [savedEvents, nextMonthYear])
  const lastMonthYearEvents = useMemo(() => savedEvents[lastMonthYear.year]?.[lastMonthYear.month] ?? [], [savedEvents, lastMonthYear])

  return (
    <div className="flex-grow flex flex-col mb-2 border-l">
      <div className="grid grid-cols-7 text-center text-sm">
        {WEEKDAYS.map((day, id) => <div className="border-r h-fit uppercase" key={id} >{day}</div>)}
      </div>
      <div className={
        clsx("grid grid-cols-7 flex-grow leading-7",
        totalDaysDisplayed === NUMBER_OF_DAYS_IN_FOUR_WEEKS ? 
          "grid-rows-4" : totalDaysDisplayed === NUMBER_OF_DAYS_IN_FIVE_WEEKS ? "grid-rows-5" : "grid-rows-6")}>
        {daysOfLastMonth.map((day, id) => <Day key={id} dayId={id} day={day} month={lastMonthYear.month} year={lastMonthYear.year} events={lastMonthYearEvents.filter((e) => e.day.toDateString() === new Date(lastMonthYear.year, lastMonthYear.month-1, day).toDateString())}/>)}
        {Array.from({length: _daysInMonth}, (val, id) => id+1).map(
          (day, id) => <Day key={id} isCurrentMonth={true} dayId={id + daysOfLastMonth.length} day={day} month={month} year={year} events={thisMonthYearEvents.filter((e) => e.day.toDateString() === new Date(year, month-1, day).toDateString())}/>
        )}
        {daysOfNextMonth.map((day, id) => <Day key={id} dayId={id + daysOfLastMonth.length + _daysInMonth} day={day} month={nextMonthYear.month} year={nextMonthYear.year} events={nextMonthYearEvents.filter((e) => e.day.toDateString() === new Date(nextMonthYear.year, nextMonthYear.month-1, day).toDateString())}/>)}
      </div>
      {/* {addEvent && <EventPopUp setClosePopUp={setAddEvent}/>} */}
    </div>
  )
}
