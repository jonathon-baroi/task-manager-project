import React, { useContext } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { TaskContext } from "./App";

export default function Task({
  id,
  heading,
  date,
  time,
  recurring,
  onDelete,
  onEdit,
}) {
  const { setTasks } = useContext(TaskContext);

  const handleDelete = async () => {
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      const response = await fetch(
        `https://task-manager-project-1-a97g.onrender.com/delete-task/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="task">
      <button
        className="task-complete-button"
        onClick={() => handleDelete(id)}
      ></button>

      <div className="task-text-group">
        <div className="task-text">
          <div className="task-styling">
            {heading}
            <span className="muted">
              {date} {time && ` ${time}`}
            </span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        {/* <button onClick={onEdit} className="task-edit-button" title="Edit">
          <AiFillEdit size={20} />
        </button> */}
        {/* <button
          onClick={onDelete}
          className="task-delete-button"
          title="Delete"
        >
          <AiFillDelete size={20} />
        </button> */}
      </div>
    </div>
  );
}
