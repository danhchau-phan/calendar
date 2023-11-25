import React, { useEffect, useMemo } from "react";
import clsx from "clsx";
import { EVENTS_DISPLAYED_PER_ROW, NUMBER_OF_DAYS_IN_FIVE_WEEKS, NUMBER_OF_DAYS_IN_FOUR_WEEKS, WEEKDAYS } from "../common/constants";
import { MonthProps } from "../common/type";
import { numberOfDaysInMonth, numberOfDaysOfNextMonthWithinTheLastWeek, daysOfLastMonthWithinTheFirstWeek, getLastMonthYear, getNextMonthYear } from "../common/dayUtils";
import Day from "../Day/Day";

import "./Month.scss"

export default function Month({month, year, savedEvents, occupiedSpaces}: MonthProps) {
  

  const nextMonthYear = useMemo(() => getNextMonthYear(month, year), [month, year])
  const lastMonthYear = useMemo(() => getLastMonthYear(month, year), [month, year])
  const daysOfLastMonth = useMemo(() => daysOfLastMonthWithinTheFirstWeek(month, year), [month, year])
  const _numberOfDaysInMonth: number = useMemo(() => numberOfDaysInMonth(month, year), [month, year])
  const numberOfNextMonthDays = useMemo(() => numberOfDaysOfNextMonthWithinTheLastWeek(month, year), [month, year])

  const totalDaysDisplayed = useMemo(() => daysOfLastMonth.length + _numberOfDaysInMonth + numberOfNextMonthDays, [daysOfLastMonth, _numberOfDaysInMonth, numberOfNextMonthDays])
  
  const thisMonthYearEvents = useMemo(() => savedEvents[year]?.[month] ?? [], [savedEvents, month, year])
  const nextMonthYearEvents = useMemo(() => savedEvents[nextMonthYear.year]?.[nextMonthYear.month] ?? [], [savedEvents, nextMonthYear])
  const lastMonthYearEvents = useMemo(() => savedEvents[lastMonthYear.year]?.[lastMonthYear.month] ?? [], [savedEvents, lastMonthYear])

  const lastMonthDayToDayIdMapping = useMemo(() => {
    const mapping :Record<number, number> = {}
    daysOfLastMonth.forEach((day, id) => mapping[day] = id)
    return mapping
  }, [daysOfLastMonth])
  
  const thisMonthDayToDayIdMapping = useMemo(() => {
    const mapping :Record<number, number> = {}
    Array.from({length: _numberOfDaysInMonth}, (_, id) => id+1).forEach((day, id) => mapping[day] = id+daysOfLastMonth.length)
    return mapping
  }, [_numberOfDaysInMonth, daysOfLastMonth])

  const nextMonthDayToDayIdMapping = useMemo(() => {
    const mapping :Record<number, number> = {}
    Array.from(
      {length: numberOfNextMonthDays}, 
      (_, id) => id + 1).forEach((day, id) => mapping[day] = id + daysOfLastMonth.length + _numberOfDaysInMonth)
    return mapping
  }, [_numberOfDaysInMonth, daysOfLastMonth, numberOfNextMonthDays])

  

  useEffect(() => {
    document.getElementById("prev-month-button")?.addEventListener("click", () => {
      document.getElementById("month-container")?.classList.add("slide-right")
    })
  })

  return (
    <div id="month-container" className="flex-grow flex flex-col mb-2 border-l">
      <div className="grid grid-cols-7">
        {WEEKDAYS.map((day, id) => <div className="border-r pt-3 h-fit uppercase text-center text-sm tracking-tighter" key={id} >{day}</div>)}
      </div>
      <div className={
        clsx("grid grid-cols-7 flex-grow leading-7 text-sm",
        totalDaysDisplayed === NUMBER_OF_DAYS_IN_FOUR_WEEKS ? 
          "grid-rows-4" : totalDaysDisplayed === NUMBER_OF_DAYS_IN_FIVE_WEEKS ? "grid-rows-5" : "grid-rows-6")}>
        {daysOfLastMonth.map((day, id) => 
          <Day
            key={id}
            dayId={id}
            day={day}
            month={lastMonthYear.month}
            year={lastMonthYear.year}
            saveEvents={lastMonthYearEvents}
            numberOfUndisplayedEvents={
              (occupiedSpaces[lastMonthYear.year]?.[lastMonthYear.month]?.[id] ?? []).reduce((acc, val, idx, _) => idx > EVENTS_DISPLAYED_PER_ROW - 1 ? acc + val : acc, 0)
            }
            dayToDayIdMapping={lastMonthDayToDayIdMapping}
            />)}
        {Array.from({length: _numberOfDaysInMonth}, (val, id) => id+1).map(
          (day, id) =>
          <Day
          key={id}
          isCurrentMonth={true}
          dayId={id + daysOfLastMonth.length}
          day={day}
          month={month}
          year={year}
          saveEvents={thisMonthYearEvents}
          numberOfUndisplayedEvents={
            (occupiedSpaces[year]?.[month]?.[id] ?? []).reduce((acc, val, idx, _) => idx > EVENTS_DISPLAYED_PER_ROW - 1 ? acc + val : acc, 0)
          }
          dayToDayIdMapping={thisMonthDayToDayIdMapping}
          />
          )}
        {Array.from({length: numberOfNextMonthDays}, (val, id) => id+1).map((day, id) => 
          <Day
          key={id}
          dayId={id + daysOfLastMonth.length + _numberOfDaysInMonth}
          day={day}
          month={nextMonthYear.month}
          year={nextMonthYear.year}
          saveEvents={nextMonthYearEvents}
          numberOfUndisplayedEvents={
            (occupiedSpaces[nextMonthYear.year]?.[nextMonthYear.month]?.[id] ?? []).reduce((acc, val, idx, _) => idx > EVENTS_DISPLAYED_PER_ROW - 1 ? acc + val : acc, 0)
          }
          dayToDayIdMapping={nextMonthDayToDayIdMapping}
          />)}
      </div>
    </div>
  )
}
