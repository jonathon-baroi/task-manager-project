import React, { useState } from "react";
import { useContext } from "react";
import { TaskContext } from "./App";
import { taskCountContext } from "./RightSection";

export default function TabButton({ type }) {
  const { todayCount, upcomingCount, overdueCount } =
    useContext(taskCountContext);
  const { selectedTab, setSelectedTab, tasks } = useContext(TaskContext);
  const text = type === 0 ? `Today` : type === 1 ? `Upcoming` : `Overdue`;

  const count =
    type === 0 ? todayCount : type === 1 ? upcomingCount : overdueCount;
  return (
    <>
      <div className="tab-button-container">
        {type === selectedTab && (
          <>
            <div className="left-circle"></div>
            <div className="left-box"></div>
          </>
        )}
        <button
          onClick={() => {
            setSelectedTab(type);
            // console.log(type);
          }}
          className={`tab ${
            type === selectedTab ? "active-tab" : "tab-button"
          }`}
        >
          <div className="only-tab-text">
            <div className="tab-text">{text}</div>
            <div className="count-class"> {count}</div>
          </div>
        </button>
        {type === selectedTab && (
          <>
            <div className="right-box"></div>
            <div className="right-circle"></div>
          </>
        )}
      </div>
    </>
  );
}
