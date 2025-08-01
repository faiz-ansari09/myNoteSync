const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5000;
const frontendurl = process.env.FRONTEND_URL;

// Middleware
// app.use(cors());
app.use(express.json());

// Configure CORS
app.use(
  cors({
    // origin: ["https://my-note-sync-faiz.vercel.app"],
    origin: [`${frontendurl}`],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // Allow credentials if needed
  })
);

// Handle preflight requests
// app.options("*", cors());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to myNoteSync</h1>");
});

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Start Server                   // for local development
app.listen(port, () => {
  connectToMongo();
  console.log(`myNoteSync backend listening at http://localhost:${port}`);
});

// Vercel serverless function export          // for Vercel deployment
let isConnected = false;
module.exports = async (req, res) => {
  if (!isConnected) {
    await connectToMongo();
    isConnected = true;
  }
  app(req, res);
};
