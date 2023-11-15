import React, { useState } from "react";
import { WEEKDAYS } from "./constants";
import { MonthYear } from "./type";
import { daysInMonth, daysOfNextMonthWithinTheWeek, daysOfLastMonthWithinTheWeek, isToday } from "./utils";

import "./Month.scss"
import EventPopUp from "./EventPopUp";
import Day from "./Day";

export default function Month({month, year}: MonthYear) {
  const [addEvent, setAddEvent] = useState(true)

  return (
    <div className="flex-grow flex flex-col">
      <div className="grid grid-cols-7 text-center text-sm">
        {WEEKDAYS.map((day) => <div className="border-x h-fit uppercase">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 flex-grow leading-7">
        {daysOfLastMonthWithinTheWeek(month, year).map((day) => <Day day={day} month={month} year={year} />)}
        {Array.from({length: daysInMonth(month, year)}, (val, id) => id+1).map(
          (day) => <Day isCurrentMonth={true} day={day} month={month} year={year} />
        )}
        {daysOfNextMonthWithinTheWeek(month, year).map((day) => <Day day={day} month={month} year={year} />)}
      </div>
      {addEvent && <EventPopUp setClosePopUp={setAddEvent}/>}
    </div>
  )
}
