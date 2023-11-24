import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MonthYear } from "../common/type";
import { getLongMonthName } from "../common/dayUtils";

interface NavigationProps extends MonthYear {
  setMonthYear: Function
}
export default function Navigation({month, year, setMonthYear}: NavigationProps) {
  
  return <div className="p-3 flex flex-row items-center border-b box-border">
          <div className="min-w-[238px] text-2xl font-bold text-center w-[270px]">
            Calendar
          </div>
          <div className="flex flex-row h-12 py-1 items-center">
            <button className="px-[14px] box-border h-full border rounded mr-6">Today</button>
            <ChevronLeftIcon style={{ fontSize: 28 }} className="mr-2" onClick={() => setMonthYear({month: month-1, year})} />
            <ChevronRightIcon style={{ fontSize: 28 }} onClick={() => setMonthYear({month: month+1, year})} />
            <div className="ml-4 flex-grow text-2xl font-bold">
              {getLongMonthName(month)} {year}
            </div>
          </div>
        </div>
}
