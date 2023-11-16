import React from "react";
import { CalendarEventProps } from "./type";

import "./Event.scss";

export default function CalendarEvent({eventLength, eventStartDayId, dayId, title = "(No title)"}: CalendarEventProps) {
  const actualEventStartDayId = eventLength >= 0 ?
  eventStartDayId : eventStartDayId as number + eventLength
  return <>
    {dayId === actualEventStartDayId && 
    <div className="event" style={{ width: `calc(${100 * (Math.abs(eventLength)+1)}% - 9px)`}}>{title}</div>}
    </>
}
