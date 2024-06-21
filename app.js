const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Connect Database
connectDB();

app.use(bodyParser.json());
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/user"));
app.use("/api/organizations", require("./routes/organization"));
app.use("/api/tasks", require("./routes/task"));

module.exports = app;
