import React, { useEffect, useState } from "react"
import clsx from "clsx";
import { getShortMonthName, isToday } from "./utils";
import "./Day.scss"
import { CalendarState } from "./type";
import { useStore } from "./store";

interface DayProps {
  isCurrentMonth?: boolean
  dayId: number
  day: number
  month: number
  year: number
}

export default function Day({isCurrentMonth = false, dayId, day, month, year}: DayProps) {
  const addEvent = useStore((state: CalendarState) => state.startAddingEvent)
  const finalizeEvent = useStore((state: CalendarState) => state.finalizeEvent)
  const eventFinalized = useStore((state) => state.eventFinalized)
  const eventLength = useStore((state) => state.eventLength)
  const setEventLength = useStore((state) => state.setEventLength)
  const [finalDaySelectedInEvent, setFinalDaySelectedInEvent] = useState<boolean | null>(null);
  const [eventStartsThisDay, setEventStartsThisDay] = useState(false)

  useEffect(() => {
    finalDaySelectedInEvent !== null && (finalDaySelectedInEvent ? setEventLength(eventLength+1) : setEventLength(eventLength-1));
  }, [finalDaySelectedInEvent, setEventLength]);

  useEffect(() => {
    if (eventFinalized) {
      setEventLength(0);
      setFinalDaySelectedInEvent(null);
      setEventStartsThisDay(false);
    } 
  }, [eventFinalized, setEventLength])

  return (
  <div 
    draggable
    onDragStart={(e) => {
      e.preventDefault();
      addEvent();
      setEventStartsThisDay(true);
      setFinalDaySelectedInEvent(true);
    }}
    onMouseOver={(e) => {
      e.preventDefault();
      !eventFinalized && setFinalDaySelectedInEvent((selected) => (!selected));
    }}
    onMouseLeave={(e) => {
      e.preventDefault();
      !eventFinalized && setFinalDaySelectedInEvent((selected) => (!selected));
    }}
    onMouseUp={(e) => {
      e.preventDefault()
      finalizeEvent();
    }}
    className={clsx("day", !isCurrentMonth && "disabled-tile")}>
    <div className="day-number">
      <div className={clsx("inline-block",isToday(day,month,year) && "text-white rounded-full bg-blue-800 w-7")}>
        {day === 1 ? <div>{day}&nbsp;{getShortMonthName(month)}</div> : day} 
      </div>
    </div>
    <div className="py-2">
      {eventStartsThisDay && <div className="bg-red-300 h-1/3 rounded-md sticky"
      style={{ width: `calc(${100 * eventLength}% - 9px)`}}>placeholder</div>}
    </div>
  </div>)
}
