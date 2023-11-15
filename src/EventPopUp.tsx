import React, { useState } from "react";
import { Xmark } from "iconoir-react";

import "./EventPopUp.scss";

interface PopUpProps {
  setClosePopUp: Function
}

export default function EventPopUp({setClosePopUp}: PopUpProps) {
  return (
    <div className="fixed z-10 w-96 h-fit bg-white rounded-lg shadow-lg">
      <div className="bg-slate-200 h-10 rounded-t-lg flex flex-row justify-end items-center">
        <div className="h-7 w-7 rounded-full hover:bg-slate-300 mr-3 items-center">
          <Xmark className="cursor-pointer" onClick={(e) => setClosePopUp(false)}/>        
        </div>
      </div>
      <div className="ml-8 mr-4 mt-8">
        <input placeholder="Add title and time" 
          className="text-area"/>
        <div>
          <button className="button">Event</button>
          <button className="button">Task</button>
        </div>
        <div>Time</div>
        <div className="border-t">
          <div className="float-right"> 
            <button className="button">More options</button>
            <button className="button">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>)
}
