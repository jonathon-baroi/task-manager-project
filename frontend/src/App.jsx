import "./App.css";
import { FaRegUser } from "react-icons/fa";
import { SignOutButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
function App() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [date, setDate] = useState(new Date());
  const [tasksCompleted, setTasksCompleted] = useState(70);

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      <div className="home-container">
        {/* <div className="sidebar">
          <div className="sidebar-option">Dashboard</div>
          <div className="sidebar-option">Home</div>
        </div> */}
        <div className="right-section">
          <nav>
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
          <div className="dashboard">
            <div className="greeting">{`${getGreeting()}, ${
              user.firstName
            }!`}</div>
            <div className="welcome-message">
              <div className="welcome-unit">
                <div>
                  Today's{" "}
                  {date.toLocaleDateString("en-US", { weekday: "long" })}
                </div>
                <div className="muted">{formattedDate}</div>
              </div>
              <div className="welcome-unit">
                <div>70% Done</div>
                <div className="muted">Today's Tasks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
