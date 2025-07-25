require("dotenv").config(); // Load environment variables from .env
const connectToMongo = require("./db");
const express = require("express");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToMongo();

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Start Server
app.listen(port, () => {
  console.log(`myNoteSync backend listening at http://localhost:${port}`);
});
