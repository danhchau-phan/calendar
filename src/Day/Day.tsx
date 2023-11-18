import React, { useCallback, useEffect, useState } from "react"
import clsx from "clsx";
import { addDays, getShortMonthName, isToday } from "../common/utils";
import CalendarEvent from "../Event/Event";
import { CalendarState, DayProps } from "../common/type";
import { useStore } from "../store/store";

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
  }, [finalDaySelectedInEvent, setEventLength, dayId, eventStartDayId]);

  useEffect(() => {
    if (eventFinalized) {
      setFinalDaySelectedInEvent(null);
    } 
  }, [eventFinalized])

  const onDragStart = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    addEvent();
    setEventStartDayId(dayId);
    setFinalDaySelectedInEvent(true);
  }, [addEvent, setEventStartDayId, dayId])

  const onMouseOver = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    !eventFinalized && setFinalDaySelectedInEvent((selected) => (!selected));
  }, [eventFinalized, setFinalDaySelectedInEvent])

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
      const {day: _day, month: _month, year: _year} = addDays(day, month, year, -eventLength)
      saveEvent({
        eventLength: eventLength,
        day: _day,
        month: _month,
        year: _year,
        title: "Temp title"
      })
    }
    finalizeEvent();
  }, [saveEvent, finalizeEvent, eventLength, day, month, year])

  const onMouseOut = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    !eventFinalized && setFinalDaySelectedInEvent((selected) => (!selected));
  }, [eventFinalized,setFinalDaySelectedInEvent])

  return (
  <div 
    draggable
    onDragStart={onDragStart}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    onMouseUp={onMouseUp}
    className={clsx("day", !isCurrentMonth && "disabled-day")}>
    <div className="day-number">
      <div className={clsx("inline-block",isToday(day,month,year) && "text-white rounded-full bg-blue-800 w-7")}>
        {day === 1 ? <div>{day}&nbsp;{getShortMonthName(month)}</div> : day}
      </div>
    </div>
    <div className={clsx("flex-grow py-2", !eventFinalized && "pointer-events-none")}>
      {eventLength !== 0 && <CalendarEvent eventLength={eventLength} eventStartDayId={eventStartDayId ?? 0} dayId={dayId}/>}
      {events.map((event, id) => <CalendarEvent key={id} eventLength={event.eventLength} eventStartDayId={dayId} dayId={dayId} title={event.title}/>)}
    </div>
  </div>)
}
