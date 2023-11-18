import React from "react";
import { render, screen } from "@testing-library/react";

import Month from "./Month";
import { calendarEventsFactory, monthYearFactory } from "../common/factory"
import { CalendarEvent, MonthYear } from "../common/type"


describe("Month", () => {
  let monthYear: MonthYear;
  let savedEvents: Record<number, Record<number, CalendarEvent[]>>;
  beforeEach(() => {
    monthYear = monthYearFactory()
    const {month, year} = monthYear
    savedEvents = {
      [year]: {[month]: calendarEventsFactory({month, year})}
    }
  })

  it("renders events accurately", () => {
    render(<Month savedEvents={savedEvents} month={monthYear.month} year={monthYear.year} />)
    
  })
})
