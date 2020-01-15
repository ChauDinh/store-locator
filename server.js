const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const db = require("./config/db");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to database
db();

// Initialize express app
const app = express();

// Setup body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Static files
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

// Routes
app.use("/api/v1/stores", require("./routes/stores"));

app.listen(PORT, () =>
  console.log(`💩  the app is listening on ${PORT} as ${MODE} mode`)
);
