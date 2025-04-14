import React, { useEffect, useRef, useState, useContext } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { ModalContext } from "./App";
export default function LeftSection({
  user,
  date,
  formattedDate,
  backendUser,
}) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const morningGreetings = [
      "Good Morning!",
      "Morning!",
      "Up and at it!",
      "Let’s go!",
    ];

    const morningPhrases = [
      "Time to move",
      "Start strong",
      "Stay sharp",
      "Make it count",
    ];

    const afternoonGreetings = [
      "Good Afternoon!",
      "Hey!",
      "Still grinding?",
      "Keep going!",
    ];

    const afternoonPhrases = [
      "Push through",
      "Stay on it",
      "Focus up",
      "You’ve got this",
    ];

    const eveningGreetings = [
      "Good Evening!",
      "Evening vibes.",
      "Welcome back!",
      "Hope your day went well.",
    ];

    const eveningPhrases = [
      "Wrap it up strong",
      "Stay steady",
      "Almost done",
      "One last push",
    ];

    const nightGreetings = [
      "Hey night owl!",
      "Still up?",
      "Late night hustle!",
      "Night shift mode!",
    ];

    const nightPhrases = [
      "Keep it light",
      "Stay chill",
      "Focus then rest",
      "You’re doing great",
    ];

    if (hour >= 5 && hour < 12) {
      return `${getRandom(morningGreetings)} ${getRandom(morningPhrases)}`;
    } else if (hour >= 12 && hour < 17) {
      return `${getRandom(afternoonGreetings)} ${getRandom(afternoonPhrases)}`;
    } else if (hour >= 17 && hour < 21) {
      return `${getRandom(eveningGreetings)} ${getRandom(eveningPhrases)}`;
    } else {
      return `${getRandom(nightGreetings)} ${getRandom(nightPhrases)}`;
    }
  };
  const { setTasks } = useContext(ModalContext);
  const dialogRef = useRef();
  const [taskHeading, setTaskHeading] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const openModal = () => {
    dialogRef.current.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current.close();
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    const taskPayload = {
      heading: taskHeading,
      date: taskDate,
      time: taskTime || null,
      user_id: backendUser.id,
    };
    console.log("Payload:", {
      heading: taskHeading,
      date: taskDate,
      time: taskTime,
      user_id: backendUser?.id,
    });
    try {
      const response = await fetch("http://localhost:3000/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskPayload),
      });

      if (!response.ok) throw new Error("Failed to add task");

      const { task } = await response.json();

      setTasks((prev) => [...prev, task]);

      // Reset form
      setTaskHeading("");
      setTaskDate("");
      setTaskTime("");
      setIsRecurring(false);
      handleCloseModal();
    } catch (err) {
      console.error("Add task error:", err);
    }
  };

  const greeting = useRef(getGreeting());

  return (
    <>
      <div className="left-section">
        <div className="greeting">{`${greeting.current}, ${user.firstName}!`}</div>
        <div className="welcome-message">
          <div className="welcome-unit">
            <div>
              Today's {date.toLocaleDateString("en-US", { weekday: "long" })}
            </div>
            <div className="muted">{formattedDate}</div>
          </div>
          {/* <div className="welcome-unit">
            <div>70% Done</div>
            <div className="muted">Today's Tasks</div>
          </div> */}
          <div className="add-task-button-container">
            <button className="add-task-button" onClick={openModal}>
              <div className="plus-sign">+</div>
              Task
            </button>
          </div>
        </div>
      </div>
      <div>
        <dialog ref={dialogRef} className="task-modal">
          <div className="modal-header">
            {/* <h2>Add a New Task</h2> */}

            <AiFillCloseSquare
              onClick={handleCloseModal}
              className="close-button"
              size={50}
            />
          </div>

          <form onSubmit={handleAddTask} className="modal-form">
            <div className="form-group">
              <label htmlFor="taskHeading">Task Heading</label>
              <input
                type="text"
                id="taskHeading"
                name="taskHeading"
                placeholder="e.g. Walk the dog."
                required
                className="modal-input"
                value={taskHeading}
                onChange={(e) => setTaskHeading(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskDate">Date</label>
              <input
                type="date"
                id="taskDate"
                name="taskDate"
                className="modal-input"
                required
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskTime">
                Time <span className="optional-text">(optional)</span>
              </label>
              <input
                type="time"
                className="modal-input"
                id="taskTime"
                name="taskTime"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
              />
            </div>

            {/* <div className="checkbox-group">
              <div>Recurring</div>
              <input
                type="checkbox"
                id="taskRecurring"
                name="taskRecurring"
                className="check-box1"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
              />
            </div> */}

            <button type="submit" className="submit-button">
              Add Task
            </button>
          </form>
        </dialog>
      </div>
    </>
  );
}
