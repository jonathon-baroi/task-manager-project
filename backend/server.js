const express = require("express");
const env = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

env.config();

const app = express();

const supabase = createClient(
  process.env.DATABASE_URL,
  process.env.DATABASE_KEY
);

app.get("/", (_, res) => {
  res.json({ info: "Express app with Supabase" });
});

app.get("/users", async (_, response) => {
    try {
      const { data, error } = await supabase.from("users").select();
      console.log(data);
      return response.send(data);
    } catch (error) {
      return response.send({ error });
    }
  });
  

app.listen(process.env.PORT || 3000, () =>
  console.log(
    new Date().toLocaleTimeString() +
      `: Server is running on port ${process.env.PORT || 3000}...`
  )
);
