import "./App.css";
import { FaRegUser } from "react-icons/fa";
import { SignOutButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import Task from "./Task.jsx";
import LeftSection from "./LeftSection.jsx";
import RightSection from "./RightSection.jsx";
import { createContext } from "react";

export const TaskContext = createContext();

function App() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [date, setDate] = useState(new Date());
  const [tasksCompleted, setTasksCompleted] = useState(70);
  const [selectedTab, setSelectedTab] = useState(0);
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
        {/* <div className="sidebar">
          <div className="sidebar-option">Dashboard</div>
          <div className="sidebar-option">Home</div>
        </div> */}
        <div className="right-section">
          <nav className="shadow">
            <input type="text" placeholder="Search" className="search-bar" />
            <div className="nav-right">
              <IoNotificationsCircleOutline
                className="notification"
                size={30}
              />
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
            <LeftSection
              user={user}
              date={date}
              formattedDate={formattedDate}
            />
            <TaskContext.Provider value={{ selectedTab, setSelectedTab }}>
              <RightSection />
            </TaskContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
