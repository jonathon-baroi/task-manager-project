import "./App.css";
import { FaRegUser } from "react-icons/fa";
import { SignOutButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect, useRef, useContext } from "react";
import Task from "./Task.jsx";
import LeftSection from "./LeftSection.jsx";
import RightSection from "./RightSection.jsx";
import { createContext } from "react";
import DialogModal from "./Modal.jsx";
import { useAuth } from "@clerk/clerk-react";
export const TaskContext = createContext();
export const ModalContext = createContext();
export const allTasksContext = createContext();
//https://task-manager-project-1-a97g.onrender.com/
function App() {
  const { isLoaded, isSignedIn, user } = useUser();
  const fetchTasks = async () => {
    // Only fetch if we have a backend user ID
    if (!backendUser?.id) return;

    try {
      const response = await fetch(
        `https://task-manager-project-1-a97g.onrender.com/tasks/${backendUser.id}`
      );
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };
  const [backendUser, setBackendUser] = useState(null);
  const syncUser = async () => {
    try {
      const response = await fetch(
        "https://task-manager-project-1-a97g.onrender.com/sync-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerk_id: user.id }),
        }
      );
      const data = await response.json();

      if (data.exists) {
        console.log("Existing user:", data.user);
      } else {
        console.log("New user created:", data.user);
      }

      setBackendUser(data.user);

      return data.user;
    } catch (error) {
      console.error("Sync failed:", error);
    }
  };

  useEffect(() => {
    if (user) {
      syncUser();
    }
  }, [user]);

  useEffect(() => {
    if (backendUser?.id) {
      fetchTasks();
    }
  }, [backendUser]);
  const [date, setDate] = useState(new Date());
  const [tasksCompleted, setTasksCompleted] = useState(70);
  const [selectedTab, setSelectedTab] = useState(0);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <>
      <div className="home-container">
        {/* <DialogModal /> */}
        {/* <div className="sidebar">
          <div className="sidebar-option">Dashboard</div>
          <div className="sidebar-option">Home</div>
        </div> */}
        <div className="right-section">
          <nav className="shadow">
            <div className="nav-left">
              <div>TASKMAN</div>
              {/* <input type="text" placeholder="Search" className="search-bar" /> */}
              {/* <button className="nav-button">Dashboard</button>
              <button className="nav-button">Categories</button> */}
            </div>
            <div className="nav-right">
              {/* <IoNotificationsCircleOutline
                className="notification"
                size={30}
              /> */}
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "3rem",
                      height: "3rem",
                    },
                  },
                }}
              />
              {/* <SignOutButton redirectUrl="/signup" /> */}
            </div>
          </nav>
          <div className="dashboard shadow">
            <ModalContext.Provider value={{ setTasks }}>
              <LeftSection
                user={user}
                date={date}
                formattedDate={formattedDate}
                backendUser={backendUser}
              />
            </ModalContext.Provider>

            <TaskContext.Provider
              value={{ selectedTab, setSelectedTab, tasks, setTasks }}
            >
              <RightSection />
            </TaskContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
