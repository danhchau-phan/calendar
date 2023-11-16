import React from "react";
import Month from "./Month";
import { Navigation } from "./Navigation";
import { useStore } from "./store";

function App() {
	const monthYear = useStore((state) => state.displayedMonthYear)
	const setDisplayedMonthYear = useStore((state) => state.setDisplayedMonthYear)
	return (
		<>
			<div className="mx-8 h-screen text-gray-600 flex flex-col">
				<Navigation setMonthYear={setDisplayedMonthYear} month={monthYear.month} year={monthYear.year} />
				<Month {...monthYear} />
			</div>
		</>
	);
}

export default App;
