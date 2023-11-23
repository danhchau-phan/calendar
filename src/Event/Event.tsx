import React from "react";
import { CalendarEventProps } from "../common/type";
import { NUMBER_OF_DAYS_IN_WEEK } from "../common/constants";

import "./Event.scss";
import clsx from "clsx";

export default function CalendarEvent({eventLength, eventStartDayId, dayId, title = "(No title)", savedEvent = true, eventPlacement = 1}: CalendarEventProps) {
  const actualEventStartDayId = eventLength >= 0 ?
  eventStartDayId : eventStartDayId + eventLength
  const actualLength = Math.abs(eventLength) + 1
  const eventEndDayId = actualEventStartDayId + actualLength
  const isMultiRowEvent = ~~(actualEventStartDayId / NUMBER_OF_DAYS_IN_WEEK) !== 
      ~~((eventEndDayId) / NUMBER_OF_DAYS_IN_WEEK)

  return <>
    {isMultiRowEvent ? <>
      {dayId === actualEventStartDayId ? 
      <div className={clsx("event", !savedEvent && "shadow-xl z-10")} style={{ 
        width: `calc(${100 * (NUMBER_OF_DAYS_IN_WEEK - dayId % NUMBER_OF_DAYS_IN_WEEK)}% - 9px)`,
        gridRowStart: eventPlacement
      }}>{title}</div> :
      dayId > actualEventStartDayId && dayId % NUMBER_OF_DAYS_IN_WEEK === 0 && dayId < eventEndDayId &&
      <div className={clsx("event", !savedEvent && "shadow-xl z-10")} style={{ width: `calc(${100 * (eventEndDayId - dayId >= NUMBER_OF_DAYS_IN_WEEK ? NUMBER_OF_DAYS_IN_WEEK : (eventEndDayId - dayId) % NUMBER_OF_DAYS_IN_WEEK)}% - 9px)`}}>{title}</div>}
    </>: dayId === actualEventStartDayId && 
    <div className={clsx("event", !savedEvent && "shadow-xl z-10")} style={{ width: `calc(${100 * actualLength}% - 9px)`}}>{title}</div>}
    </>
}
