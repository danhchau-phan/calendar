import React from "react";
import { WEEKDAYS } from "./constants";
import { MonthYear } from "./type";
import { daysInMonth, daysOfNextMonthWithinTheWeek, daysOfLastMonthWithinTheWeek } from "./utils";

import "./Month.scss"

export default function Month({month, year}: MonthYear) {

  return (
  <div className="h-full grid grid-rows-6 grid-cols-7">
    {WEEKDAYS.map((day) => <div className="weekday-tile">{day}</div>)}
    {daysOfLastMonthWithinTheWeek(month, year).map((day) => <div className="disabled-tile">{day}</div>)}
    {Array.from({length: daysInMonth(month, year)}, (val, id) => id+1).map((day) => <div>{day}</div>)}
    {daysOfNextMonthWithinTheWeek(month, year).map((day) => <div className="disabled-tile">{day}</div>)}
  </div>
  )
}
