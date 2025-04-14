import React, { createContext } from "react";
import Task from "./Task";
import TabButton from "./TabButton";
import TabContainer from "./TabContainer";
import { useContext } from "react";
import { TaskContext } from "./App";

export const taskCountContext = createContext();

export default function RightSection() {
  const { selectedTab, setSelectedTab, tasks } = useContext(TaskContext);

  const formatTime = (timeString) => {
    if (!timeString || timeString === "") return "";

    const [hours, minutes] = timeString.split(":");

    const hour = parseInt(hours, 10);
    const minute = minutes || "00";

    const period = hour >= 12 ? "PM" : "AM";

    const twelveHour = hour % 12 || 12;

    return `at ${twelveHour}:${minute} ${period}`;
  };

  const today = new Date();
  const currentDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const currentTime = [
    String(today.getHours()).padStart(2, "0"),
    String(today.getMinutes()).padStart(2, "0"),
  ].join(":");

  const filteredTasks = tasks.filter((task) => {
    if (!task.date) return false;

    if (selectedTab === 0) {
      return (
        task.date === currentDate &&
        (task.time === "" || task.time === null || task.time >= currentTime)
      );
    }

    if (selectedTab === 1) {
      return task.date > currentDate;
    }

    if (selectedTab === 2) {
      return (
        task.date < currentDate ||
        (task.date === currentDate &&
          task.time !== "" &&
          task.time !== null &&
          task.time < currentTime)
      );
    }

    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if ((!a.time || a.time === "") && (!b.time || b.time === "")) return 0;
    if (!a.time || a.time === "") return -1;
    if (!b.time || b.time === "") return 1;
    return a.time.localeCompare(b.time);
  });

  const todayCount = tasks.filter(
    (task) =>
      task.date === currentDate &&
      (task.time === "" || task.time === null || task.time >= currentTime)
  ).length;

  const upcomingCount = tasks.filter((task) => task.date > currentDate).length;

  const overdueCount = tasks.filter(
    (task) =>
      task.date < currentDate ||
      (task.date === currentDate &&
        (task.time !== "" || task.time !== null) &&
        task.time < currentTime)
  ).length;

  return (
    <>
      <div className="right-section2">
        <taskCountContext.Provider
          value={{ todayCount, upcomingCount, overdueCount }}
        >
          <TabContainer />
        </taskCountContext.Provider>
        <div className="task-container">
          <ul className="task-list">
            {sortedTasks.map((task) => {
              return (
                <li key={task.id}>
                  <Task
                    id={task.id}
                    heading={task.heading}
                    date={task.date}
                    time={`${formatTime(task.time)}`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
