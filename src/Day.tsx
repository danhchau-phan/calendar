import React, { useEffect, useState } from "react"
import clsx from "clsx";
import { getShortMonthName, isToday } from "./utils";
import CalendarEvent from "./Event";
import { CalendarState } from "./type";
import { useStore } from "./store";

import "./Day.scss"

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
  const eventStartDayId = useStore((state) => state.eventStartDayId)
  const setEventStartDayId = useStore((state) => state.setEventStartDayId)
  const [finalDaySelectedInEvent, setFinalDaySelectedInEvent] = useState<boolean | null>(null);

  useEffect(() => {
    finalDaySelectedInEvent !== null && eventStartDayId !== null && finalDaySelectedInEvent &&
        setEventLength(dayId - eventStartDayId)
  }, [finalDaySelectedInEvent, setEventLength]);

  useEffect(() => {
    if (eventFinalized) {
      setFinalDaySelectedInEvent(null);
    } 
  }, [eventFinalized])

  return (
  <div 
    draggable
    onDragStart={(e) => {
      e.preventDefault();
      addEvent();
      setEventStartDayId(dayId);
      setFinalDaySelectedInEvent(true);
    }}
    onMouseOver={(e) => {
      e.preventDefault();
      !eventFinalized && setFinalDaySelectedInEvent((selected) => (!selected));
    }}
    onMouseOut={(e) => {
      e.preventDefault();
      !eventFinalized && setFinalDaySelectedInEvent((selected) => (!selected));
    }}
    onMouseUp={(e) => {
      e.preventDefault()
      finalizeEvent();
      // TODO save event into store
      setEventLength(0);
    }}
    className={clsx("day", !isCurrentMonth && "disabled-day")}>
    <div className="day-number">
      <div className={clsx("inline-block",isToday(day,month,year) && "text-white rounded-full bg-blue-800 w-7")}>
        {day === 1 ? <div>{day}&nbsp;{getShortMonthName(month)}</div> : day}
      </div>
    </div>
    <div className="py-2 pointer-events-none">
      <CalendarEvent eventLength={eventLength} eventStartDayId={eventStartDayId ?? 0} dayId={dayId}/>
    </div>
  </div>)
}
