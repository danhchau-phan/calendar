import React from "react";
import Month from "./Month/Month";
import Navigation from "./Navigation/Navigation";
import { useBoundStore } from "./store/store";

function App() {
	const monthYear = useBoundStore((state) => state.displayedMonthYear)
	const setDisplayedMonthYear = useBoundStore((state) => state.setDisplayedMonthYear)
	const savedEvents = useBoundStore((state) => state.savedEvents)
	return (
		<>
			<div className="mx-8 h-screen text-gray-600 flex flex-col">
				<Navigation setMonthYear={setDisplayedMonthYear} month={monthYear.month} year={monthYear.year} />
				<Month {...monthYear} savedEvents= {savedEvents}/>
			</div>
		</>
	);
}

export default App;
