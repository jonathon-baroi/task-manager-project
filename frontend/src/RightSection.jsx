import React from "react";
import Task from "./Task";
import TabButton from "./TabButton";
import TabContainer from "./TabContainer";

export default function RightSection() {
  return (
    <>
      <div className="right-section2">
        <TabContainer />
        <div className="task-container">
          <Task />
          <Task />
          <Task />
        </div>
      </div>
    </>
  );
}
