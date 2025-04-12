import React from "react";
import TabButton from "./TabButton";
import { TaskContext } from "./App";

export default function TabContainer() {
  return (
    <div className="tab-container">
      <TabButton type={0} />
      <TabButton type={1} />
      <TabButton type={2} />
    </div>
  );
}
