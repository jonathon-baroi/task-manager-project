import React, { useState } from "react";
import { useContext } from "react";
import { TaskContext } from "./App";

export default function TabButton({ type }) {
  const { selectedTab, setSelectedTab } = useContext(TaskContext);
  const text = type === 0 ? "Today" : type === 1 ? "Upcoming" : "Overdue";
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
            console.log(type);
          }}
          className={`tab ${
            type === selectedTab ? "active-tab" : "tab-button"
          }`}
        >
          <div className="tab-text">{text}</div>
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
