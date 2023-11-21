import React from "react";
import { MonthYear } from "../common/type";
import { getLongMonthName } from "../common/utils";
import { NavArrowRight, NavArrowLeft } from 'iconoir-react';

interface NavigationProps extends MonthYear {
  setMonthYear: Function
}
export default function Navigation({month, year, setMonthYear}: NavigationProps) {
  
  return <div className="px-8 flex h-[4.5rem] items-center border-b">
          <button className="p-2 px-3 border rounded-sm">Today</button>
          <NavArrowLeft height={36} width={36} className="ml-4 p-2" onClick={() => setMonthYear({month: month-1, year})} />
          <NavArrowRight height={36} width={36} className="p-2" onClick={() => setMonthYear({month: month+1, year})} />
          <div className="ml-4 flex-grow text-2xl font-bold">
            {getLongMonthName(month)} {year}
          </div>
        </div>
}
