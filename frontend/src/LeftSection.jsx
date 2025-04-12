import React, { useEffect, useRef } from "react";

export default function LeftSection({ user, date, formattedDate }) {
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

  const greeting = useRef(getGreeting());

  return (
    <div className="left-section">
      <div className="greeting">{`${greeting.current}, ${user.firstName}!`}</div>
      <div className="welcome-message">
        <div className="welcome-unit">
          <div>
            Today's {date.toLocaleDateString("en-US", { weekday: "long" })}
          </div>
          <div className="muted">{formattedDate}</div>
        </div>
        <div className="welcome-unit">
          <div>70% Done</div>
          <div className="muted">Today's Tasks</div>
        </div>
      </div>
    </div>
  );
}
