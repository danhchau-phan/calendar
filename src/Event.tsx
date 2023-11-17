import React from "react";
import { CalendarEventProps } from "./type";
import { NUMBER_OF_DAYS_IN_WEEK } from "./constants";

import "./Event.scss";

export default function CalendarEvent({eventLength, eventStartDayId, dayId, title = "(No title)"}: CalendarEventProps) {
  const actualEventStartDayId = eventLength >= 0 ?
  eventStartDayId : eventStartDayId + eventLength
  const actualLength = Math.abs(eventLength) + 1
  const eventEndDayId = actualEventStartDayId + actualLength
  const isMultiRowEvent = ~~(actualEventStartDayId / NUMBER_OF_DAYS_IN_WEEK) !== 
      ~~((eventEndDayId) / NUMBER_OF_DAYS_IN_WEEK)

  return <>
    {isMultiRowEvent ? <>
      {dayId === actualEventStartDayId ? 
      <div className="event" style={{ width: `calc(${100 * (NUMBER_OF_DAYS_IN_WEEK - dayId % NUMBER_OF_DAYS_IN_WEEK)}% - 9px)`}}>{title}</div> :
      dayId > actualEventStartDayId && dayId % NUMBER_OF_DAYS_IN_WEEK === 0 && dayId < eventEndDayId &&
      <div className="event" style={{ width: `calc(${100 * (eventEndDayId - dayId >= NUMBER_OF_DAYS_IN_WEEK ? NUMBER_OF_DAYS_IN_WEEK : (eventEndDayId - dayId) % NUMBER_OF_DAYS_IN_WEEK)}% - 9px)`}}>{title}</div>}
    </>: dayId === actualEventStartDayId && 
    <div className="event" style={{ width: `calc(${100 * actualLength}% - 9px)`}}>{title}</div>}
    </>
}
