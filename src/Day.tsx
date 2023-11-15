import React from "react"
import clsx from "clsx";
import { isToday } from "./utils";
import "./Day.scss"

interface DayProps {
  isCurrentMonth?: boolean
  day: number
  month: number
  year: number
}

export default function Day({isCurrentMonth = false, day, month, year}: DayProps) {
  return (
  <div 
    draggable
    onDragStart={(e) => {
      e.preventDefault()
    }}
    onMouseUp={(e) => {
      e.preventDefault()
      const {day: d, month: m, year: y} = JSON.parse(e.currentTarget.getAttribute("data-value") ?? "")
      console.log(d,m,y)
    }}
    className={clsx("day", !isCurrentMonth && "disabled-tile")}
    data-value={JSON.stringify({day: day, month: month, year: year})}>
    <div className="day-number">
      <div className={clsx("inline-block",isToday(day,month,year) && "text-white rounded-full bg-blue-800 w-7")}>
        {day}
      </div>
    </div> : 
    <div>{day}</div>
  }
  </div>)
}
