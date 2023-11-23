import React, { useCallback, useEffect, useState } from "react"
import clsx from "clsx";
import { getShortMonthName, isToday } from "../common/dayUtils";
import CalendarEvent from "../Event/Event";
import { CalendarState, DayProps } from "../common/type";
import { useBoundStore } from "../store/store";

import "./Day.scss"
import EventPopUp from "../EventPopUp/EventPopUp";
import { EVENTS_DISPLAYED_PER_ROW, MAXIMUM_EVENTS_DISPLAYED_PER_ROW } from "../common/constants";


export default function Day({isCurrentMonth = false, dayId, day, month, year, events}: DayProps) {
  const addEvent = useBoundStore((state: CalendarState) => state.startAddingEvent)
  const eventFinalized = useBoundStore((state) => state.eventFinalized)
  const eventLength = useBoundStore((state) => state.eventLength)
  const setEventLength = useBoundStore((state) => state.setEventLength)
  const eventStartDayId = useBoundStore((state) => state.eventStartDayId)
  const setEventStartDayId = useBoundStore((state) => state.setEventStartDayId)
  const finalizeEvent = useBoundStore((state: CalendarState) => state.finalizeEvent)

  const [finalDaySelectedInEvent, setFinalDaySelectedInEvent] = useState<boolean | null>(null);
  const [eventPopUpOpened, setEventPopUpOpened] = useState(false);

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
    finalizeEvent();
    setEventPopUpOpened(true);
  }, [setEventPopUpOpened, finalizeEvent])

  const onMouseOut = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    !eventFinalized && setFinalDaySelectedInEvent((selected) => (!selected));
  }, [eventFinalized,setFinalDaySelectedInEvent])

  return (
  <>
    <div 
      draggable
      onDragStart={onDragStart}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseUp={onMouseUp}
      className={clsx("day", !isCurrentMonth && "disabled-day")}>
      <div className="day-number">
        <div className={clsx("inline-block",isToday(day,month,year) && "text-white rounded-full bg-royal-blue w-7")}>
          {day === 1 ? <div>{day}&nbsp;{getShortMonthName(month)}</div> : day}
        </div>
      </div>
      <div className={clsx("flex-grow py-2 grid", !eventFinalized && "pointer-events-none")} style={{
        gridTemplateRows: `repeat(${EVENTS_DISPLAYED_PER_ROW}, minmax(0, 1fr))`
      }}>
        {eventLength !== null && eventStartDayId !== null && <CalendarEvent eventLength={eventLength} eventStartDayId={eventStartDayId} dayId={dayId} savedEvent={false} />}
        {events.map((event, id) => <CalendarEvent key={id} eventLength={event.eventLength} eventStartDayId={dayId} dayId={dayId} title={event.title} eventPlacement={event.placement}/>)}
      </div>
    </div>
    {eventPopUpOpened && eventLength !== null && eventStartDayId !== null && <EventPopUp eventStartDayId={eventStartDayId} setOpenPopUp={setEventPopUpOpened} day={day} month={month} year={year} eventLength={eventLength}/>}
  </>
  )
}
