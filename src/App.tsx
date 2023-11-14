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
			<div className="mx-8 text-gray-600">
				<Navigation setMonthYear={setMonthYear} month={monthYear.month} year={monthYear.year} />
				<Month {...monthYear} />
			</div>
		</>
	);
}

export default App;
