import React from "react";
import "./Login.css";
import { SignUp } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className={"container"}>
      <div className="branding-wrapper">TaskMan</div>
      <div className="login-wrapper">
        <SignUp className="clerk-part" />
      </div>
    </div>
  );
}
