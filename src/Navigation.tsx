import React, { useCallback } from "react";
import { MonthYear } from "./type";
import { getMonthName } from "./utils";
import { NavArrowRight, NavArrowLeft } from 'iconoir-react';

interface NavigationProps extends MonthYear {
  setMonthYear: Function
}
export function Navigation({month, year, setMonthYear}: NavigationProps) {
  const setMonthYearWrapper = useCallback(
    ({month, year}: MonthYear) => {
      return month > 12 ? 
      setMonthYear({month: 1, year: year+1}) : 
      (month < 1 ? setMonthYear({month: 12, year: year-1}) : setMonthYear({month, year}))
    },
    [setMonthYear]
  )
  
  return <div className="flex h-20 items-center border-b">
          <button className="p-2 px-3 border rounded-sm">Today</button>
          <NavArrowLeft height={36} width={36} className="ml-4 p-2" onClick={() => setMonthYearWrapper({month: month-1, year})} />
          <NavArrowRight height={36} width={36} className="p-2" onClick={() => setMonthYearWrapper({month: month+1, year})} />
          <div className="ml-4 flex-grow text-2xl font-bold">
            {getMonthName(month, year)} {year}
          </div>
        </div>
}
