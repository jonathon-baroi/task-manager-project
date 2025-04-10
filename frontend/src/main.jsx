// main.tsx or index.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import "./index.css";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk publishable key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{ baseTheme: dark }}
      signInUrl="/signin"
      signUpUrl="/signup"
      fallbackRedirectUrl="/home"
      afterSignOutUrl="/signup"
      afterSignInUrl="/home"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <>
                <SignedIn>
                  <App />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <App />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
