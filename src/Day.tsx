import React, { useEffect, useState } from "react"
import clsx from "clsx";
import { isToday } from "./utils";
import "./Day.scss"
import { CalendarState } from "./type";
import { useStore } from "./store";

interface DayProps {
  isCurrentMonth?: boolean
  day: number
  month: number
  year: number
}

export default function Day({isCurrentMonth = false, day, month, year}: DayProps) {
  const addEvent = useStore((state: CalendarState) => state.startAddingEvent)
  const finalizeEvent = useStore((state: CalendarState) => state.finalizeEvent)
  const increaseEventLength = useStore((state: CalendarState) => state.increaseEventLength)
  const decreaseEventLength = useStore((state: CalendarState) => state.decreaseEventLength)
  const eventFinalized = useStore((state) => state.eventFinalized)

  const [daySelectedInEvent, setDaySelectedInEvent] = useState<boolean | null>(null);

  useEffect(() => {
    daySelectedInEvent !== null && daySelectedInEvent ? increaseEventLength() : decreaseEventLength();
  }, [daySelectedInEvent, increaseEventLength, decreaseEventLength]);

  useEffect(() => {
    eventFinalized && setDaySelectedInEvent(null)
  }, [eventFinalized])

  return (
  <div 
    draggable
    onDragStart={(e) => {
      e.preventDefault();
      addEvent();
    }}
    onDragEnter={(e) => {
      e.preventDefault();
      setDaySelectedInEvent((selected) => selected === null ? true : !selected);
    }}
    onMouseUp={(e) => {
      e.preventDefault()
      finalizeEvent();
      // const {day: d, month: m, year: y} = JSON.parse(e.currentTarget.getAttribute("data-value") ?? "")
      // console.log(d,m,y)
    }}
    className={clsx("day", !isCurrentMonth && "disabled-tile")}
    data-value={JSON.stringify({day: day, month: month, year: year})}>
    <div className="day-number">
      <div className={clsx("inline-block",isToday(day,month,year) && "text-white rounded-full bg-blue-800 w-7")}>
        {day}
      </div>
    </div>
    <div>
      {day === 17 && <button className="bg-red-300 w-[200%] h-5 rounded-md sticky">placeholder</button>}
    </div>
  </div>)
}
