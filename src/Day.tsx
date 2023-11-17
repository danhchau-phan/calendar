import React, { useEffect, useState } from "react"
import clsx from "clsx";
import { addDays, getShortMonthName, isToday } from "./utils";
import CalendarEvent from "./Event";
import { CalendarState, DayProps } from "./type";
import { useStore } from "./store";

import "./Day.scss"


export default function Day({isCurrentMonth = false, dayId, day, month, year, events}: DayProps) {
  const addEvent = useStore((state: CalendarState) => state.startAddingEvent)
  const finalizeEvent = useStore((state: CalendarState) => state.finalizeEvent)
  const eventFinalized = useStore((state) => state.eventFinalized)
  const eventLength = useStore((state) => state.eventLength)
  const setEventLength = useStore((state) => state.setEventLength)
  const eventStartDayId = useStore((state) => state.eventStartDayId)
  const setEventStartDayId = useStore((state) => state.setEventStartDayId)
  const saveEvent = useStore((state) => state.saveEvent)
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
      e.preventDefault();
      if (eventLength < 0 ) {
        saveEvent( {
          eventLength: -eventLength,
          day,
          month,
          year,
          title: "Temp title"
        })
      } else {
        const {day: _day, month: _month, year: _year} = addDays(day, month, year, eventLength)
        saveEvent({
          eventLength: eventLength,
          day: _day,
          month: _month,
          year: _year,
          title: "Temp title"
        })
      }
      finalizeEvent();
    }}
    className={clsx("day", !isCurrentMonth && "disabled-day")}>
    <div className="day-number">
      <div className={clsx("inline-block",isToday(day,month,year) && "text-white rounded-full bg-blue-800 w-7")}>
        {day === 1 ? <div>{day}&nbsp;{getShortMonthName(month)}</div> : day}
      </div>
    </div>
    <div className={clsx("flex-grow py-2", !eventFinalized && "pointer-events-none")}>
      <CalendarEvent eventLength={eventLength} eventStartDayId={eventStartDayId ?? 0} dayId={dayId}/>
      {events.map((event) => <CalendarEvent eventLength={event.eventLength} eventStartDayId={dayId} dayId={dayId} title={event.title}/>)}
    </div>
  </div>)
}
