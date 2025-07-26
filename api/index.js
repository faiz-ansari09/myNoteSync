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
    // origin: ["http://localhost:3000"],
    origin: [`${frontendurl}`],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow credentials if needed
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to myNoteSync</h1>");
});

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Start Server
app.listen(port, () => {
  connectToMongo();
  console.log(`myNoteSync backend listening at http://localhost:${port}`);
});
