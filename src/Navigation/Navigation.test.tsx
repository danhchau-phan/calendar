import React from "react";
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Navigation from "./Navigation";
import { dateMonthYearFactory } from "../common/factory";
import { getLongMonthName } from "../common/dayUtils";

describe("Navigation", () => {
	it("renders successfully", async () => {
		const { month, year } = dateMonthYearFactory();
		const monthName = getLongMonthName(month);

		render(<Navigation setMonthYear={() => {}} month={month} year={year} />);

		expect(screen.getByText(new RegExp(`${monthName} ${year}`))).toBeInTheDocument()
	});
});
