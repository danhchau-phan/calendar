import React, { useState } from "react";
import Month from "./Month";
import { MonthYear } from "./type";
import { Navigation } from "./Navigation";

function App() {
	const [monthYear, setMonthYear] = useState<MonthYear>({
		month: 11,
		year: 2023
	})
	return (
		<>
			<div className="mx-8 h-screen text-gray-600 flex flex-col">
				<Navigation setMonthYear={setMonthYear} month={monthYear.month} year={monthYear.year} />
				<Month {...monthYear} />
			</div>
		</>
	);
}

export default App;
