require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { createClient } = require("@supabase/supabase-js");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const cors = require("cors");

const app = express();

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (_, res) => {
  res.json({ info: "Taskman Backend" });
});

// Protected endpoint
app.get("/me", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth; // Get user ID from Clerk middleware

    // Check if user exists in database
    const { data: existingUsers, error: selectError } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_id", userId)
      .limit(1);

    if (selectError) throw selectError;

    let user;

    // Create user if doesn't exist
    if (!existingUsers || existingUsers.length === 0) {
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert([{ 
          clerk_id: userId,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (insertError) throw insertError;
      user = newUser;
    } else {
      user = existingUsers[0];
    }

    return res.json({ user });

  } catch (error) {
    console.error("Error in /me:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: error.message 
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});