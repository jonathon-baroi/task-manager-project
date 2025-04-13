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

function App() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const syncUser = async () => {
      try {
        const token = await getToken();
        const res = await fetch("http://localhost:3000/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        setDbUser(data.user);
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };

    if (user) {
      syncUser();
    }
  }, [user, getToken]);

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
