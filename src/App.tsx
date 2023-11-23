import React from "react";
import Month from "./Month/Month";
import Navigation from "./Navigation/Navigation";
import { useBoundStore } from "./store/store";
import SideBar from "./SideBar/SideBar";

function App() {
	const monthYear = useBoundStore((state) => state.displayedMonthYear)
	const setDisplayedMonthYear = useBoundStore((state) => state.setDisplayedMonthYear)
	const savedEvents = useBoundStore((state) => state.savedEvents)
	const occupiedSpaces = useBoundStore((state) => state.occupiedSpaces)

	return (
		<>
			<div className="h-screen text-gray-600 flex flex-col">
				<Navigation setMonthYear={setDisplayedMonthYear} month={monthYear.month} year={monthYear.year} />
				<div className="flex-grow flex flex-row">
					<SideBar {...monthYear} />
					<Month {...monthYear} savedEvents= {savedEvents} occupiedSpaces={occupiedSpaces} />
				</div>
			</div>
		</>
	);
}

export default App;
