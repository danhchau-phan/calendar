import React, { useCallback, useEffect, useState } from "react";
import Close from "@mui/icons-material/Close";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useBoundStore } from "../store/store";
import { addDays } from "../common/dayUtils";
import "./EventPopUp.scss";

interface PopUpProps {
  setOpenPopUp: Function,
  day: number,
  month: number,
  year: number,
  eventLength: number,
  eventStartDayId: number
}

export default function EventPopUp({eventStartDayId, setOpenPopUp, day, month, year, eventLength}: PopUpProps) {
  const saveEvent = useBoundStore((state) => state.saveEvent)
  const setEventLength = useBoundStore((state) => state.setEventLength)  
  const [newEventTitle, setNewEventTitle] = useState("");
  const [timePeriod, setTimePeriod] = useState<{
    startDate: Date | null,
    endDate: Date | null
  }>({
    startDate: null,
    endDate: null
  });
  
  useEffect(() => {
    if (eventLength < 0 ) {
      const {day: _day, month: _month, year: _year} = addDays(day, month, year, eventLength)
      setTimePeriod({
        startDate: new Date(year, month-1, day),
        endDate: new Date(_year, _month-1, _day),
      })
    } else {
      const {day: _day, month: _month, year: _year} = addDays(day, month, year, -eventLength)
      setTimePeriod({
        startDate: new Date(_year, _month-1, _day),
        endDate: new Date(year, month-1, day)
      })
    }
  }, [eventLength, setTimePeriod, day, month, year])
  
  const onSave = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setOpenPopUp(false);
    const startDate = timePeriod.startDate
    startDate && saveEvent( {
      eventStartDayId,
      eventLength: Math.abs(eventLength),
      day: startDate.getDate(),
      month: startDate.getMonth()+1,
      year: startDate.getFullYear(),
      title: newEventTitle || "(No title)"
    })
    setEventLength(null);
  }, [eventStartDayId, setOpenPopUp, saveEvent, timePeriod, eventLength, newEventTitle, setEventLength])

  return (
    <div className="fixed z-10 w-96 h-fit bg-white rounded-lg shadow-lg">
      <div className="bg-slate-200 h-10 rounded-t-lg flex flex-row justify-end items-center">
        <div className="h-7 w-7 rounded-full hover:bg-slate-300 mr-3 flex items-center">
          <Close className="cursor-pointer m-auto" onClick={() => {
            setOpenPopUp(false);
            setEventLength(null);
          }}/>        
        </div>
      </div>
      <div className="ml-8 mr-4 mt-8">
        <input placeholder="Add title and time" onChange={(e) => setNewEventTitle(e.target.value)} value={newEventTitle}
          className="text-area"/>
        <div>
          <AccessTimeIcon className="inline-block mr-2"/>
          {`${timePeriod.startDate?.toDateString() || ""} - ${timePeriod.endDate?.toDateString() || ""}`}
        </div>
        <div className="float-right py-4"> 
          <button className="button" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>)
}
