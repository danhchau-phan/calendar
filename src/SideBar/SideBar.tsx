import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { MonthYear } from "../common/type";
import { numberOfDaysInMonth, daysOfLastMonthWithinTheFirstWeek, numberOfDaysOfNextMonthWithinTheLastWeek, getLongMonthName, isToday } from "../common/dayUtils";
import { NUMBER_OF_DAYS_IN_SIX_WEEKS, SHORTENED_WEEKDAYS } from "../common/constants";
import clsx from "clsx";

import "./SideBar.scss";

export default function SideBar(currentDisplayedMonthYear: MonthYear) {
  const [{month, year}, setMonthYear] = useState<MonthYear>(currentDisplayedMonthYear)

  const changeMonthYear = useCallback((monthYear: MonthYear) => {
    const { month, year } = monthYear;
    return month > 12
			? ({ month: 1, year: year + 1 })
			: month < 1
			? ({ month: 12, year: year - 1 })
			: ({month, year});
  }, [])

  useEffect(() => {
    setMonthYear(currentDisplayedMonthYear)
  }, [currentDisplayedMonthYear])

  const daysOfLastMonth = useMemo(() => daysOfLastMonthWithinTheFirstWeek(month, year), [month, year])
  const _numberOfDaysInMonth: number = useMemo(() => numberOfDaysInMonth(month, year), [month, year])
  const numberOfNextMonthDays = useMemo(() =>{
    const _numberOfNextMonthDays = numberOfDaysOfNextMonthWithinTheLastWeek(month, year)
    return (daysOfLastMonth.length + _numberOfDaysInMonth + _numberOfNextMonthDays < NUMBER_OF_DAYS_IN_SIX_WEEKS) ? _numberOfNextMonthDays + 7 : _numberOfNextMonthDays
  }, [daysOfLastMonth, _numberOfDaysInMonth, month, year])


  return <div className="w-[256px] pt-[84px] px-8">
    <div className="flex flex-row items-center mb-2">
      <div className="text-lg flex-grow">{getLongMonthName(month)} {year}</div>
      <ChevronLeft className="cursor-pointer" style={{ fontSize: 20 }} onClick={() => setMonthYear(changeMonthYear({month: month-1, year: year}))} />
      <ChevronRight className="cursor-pointer" style={{ fontSize: 20 }} onClick={() => setMonthYear(changeMonthYear({month: month+1, year: year}))} />
    </div>
    <div className="grid grid-cols-7 h-48 content-stretch">
      {SHORTENED_WEEKDAYS.map((day, id) => <div className="text-center text-xs" key={id}>{day}</div>)}
      {daysOfLastMonth.map((day, id) => <div className="sidebar-day text-gray-400" key={id}>{day}</div>)}
      {Array.from({length: _numberOfDaysInMonth}, (val, id) => id+1).map(
        (day, id) => 
        <div className="sidebar-day text-gray-800" key={id}>
          <div className={clsx("flex items-center justify-center",
              isToday(day,month,year) && "text-white rounded-full bg-royal-blue w-full h-full",
              day === 1 && "rounded-full bg-hawkes-blue w-full h-full")}>
            <div>{day}</div>
          </div>
        </div>
      )}
      {Array.from({length: numberOfNextMonthDays}, (val, id) => id+1).map((day, id) => <div className="sidebar-day text-gray-400" key={id}>{day}</div>)}
    </div>
  </div>
}
