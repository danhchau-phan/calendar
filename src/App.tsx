import React from "react";
import Month from "./Month/Month";
import Navigation from "./Navigation/Navigation";
import { useStore } from "./store/store";

function App() {
	const monthYear = useStore((state) => state.displayedMonthYear)
	const setDisplayedMonthYear = useStore((state) => state.setDisplayedMonthYear)
	const savedEvents = useStore((state) => state.savedEvents)
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
