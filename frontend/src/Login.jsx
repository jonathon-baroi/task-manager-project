import React from "react";
import "./Login.css";
import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="container">
      <div className="branding-wrapper">TaskMan</div>
      <div className="login-wrapper">
        <SignIn className="clerk-part" />
      </div>
    </div>
  );
}
