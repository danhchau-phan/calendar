import React, { useState } from "react";
import { WEEKDAYS } from "./constants";
import { MonthYear } from "./type";
import { daysInMonth, daysOfNextMonthWithinTheWeek, daysOfLastMonthWithinTheWeek, isToday } from "./utils";

import "./Month.scss"
import EventPopUp from "./EventPopUp";

export default function Month({month, year}: MonthYear) {
  const [addEvent, setAddEvent] = useState(true)

  return (
    <div className="flex-grow flex flex-col">
      <div className="grid grid-cols-7 text-center text-sm">
        {WEEKDAYS.map((day) => <div className="border-x h-fit uppercase">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 text-center flex-grow leading-7">
        {daysOfLastMonthWithinTheWeek(month, year).map((day) => <div className="disabled-tile day">{day}</div>)}
        {Array.from({length: daysInMonth(month, year)}, (val, id) => id+1).map(
          (day) => <div draggable
            onDragStart={(e) => {
              e.preventDefault()
            }}
           onMouseUp={(e) => {
            e.preventDefault()
            const {day: d, month: m, year: y} = JSON.parse(e.currentTarget.getAttribute("data-value") ?? "")
            console.log(d,m,y)
          }} className="day" data-value={JSON.stringify({day: day, month: month, year: year})}>
            {isToday(day,month,year) ? 
              <div className="inline-block items-center">
                <div className="text-white rounded-full bg-blue-800 w-7">
                  {day}
                </div>
              </div> : 
              <div>{day}</div>
            }
            </div>
        )}
        {daysOfNextMonthWithinTheWeek(month, year).map((day) => <div className="disabled-tile day">{day}</div>)}
      </div>
      {addEvent && <EventPopUp setClosePopUp={setAddEvent}/>}
    </div>
  )
}
