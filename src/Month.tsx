import React, { useState } from "react";
import { WEEKDAYS } from "./constants";
import { MonthYear } from "./type";
import { daysInMonth, daysOfNextMonthWithinTheLastWeek, daysOfLastMonthWithinTheFirstWeek, getLastMonthYear, getNextMonthYear } from "./utils";
import EventPopUp from "./EventPopUp";
import Day from "./Day";

import "./Month.scss"

export default function Month({month, year}: MonthYear) {
  const [addEvent, setAddEvent] = useState(true)

  const nextMonthYear = getNextMonthYear(month, year)
  const lastMonthYear = getLastMonthYear(month, year)
  const daysOfLastMonth = daysOfLastMonthWithinTheFirstWeek(month, year)
  const _daysInMonth: number = daysInMonth(month, year)
  const daysOfNextMonth = daysOfNextMonthWithinTheLastWeek(month, year)

  return (
    <div className="flex-grow flex flex-col">
      <div className="grid grid-cols-7 text-center text-sm">
        {WEEKDAYS.map((day) => <div className="border-x h-fit uppercase">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 flex-grow leading-7">
        {daysOfLastMonth.map((day, id) => <Day dayId={id} day={day} month={lastMonthYear.month} year={lastMonthYear.year} />)}
        {Array.from({length: _daysInMonth}, (val, id) => id+1).map(
          (day, id) => <Day isCurrentMonth={true} dayId={id + daysOfLastMonth.length} day={day} month={month} year={year} />
        )}
        {daysOfNextMonth.map((day, id) => <Day dayId={id + daysOfLastMonth.length + _daysInMonth} day={day} month={nextMonthYear.month} year={nextMonthYear.year} />)}
      </div>
      {addEvent && <EventPopUp setClosePopUp={setAddEvent}/>}
    </div>
  )
}
