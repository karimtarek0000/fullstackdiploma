import { config } from "dotenv";
import express from "express";
import { dbConnection } from "./DB/connection.js";

import usersRouts from "./src/modules/Users/users.route.js";
import tasksRouts from "./src/modules/Tasks/tasks.route.js";

// Express
config();
const app = express();
app.use(express.json());

// Database
dbConnection();

// Routes
app.use("/users", usersRouts);
app.use("/tasks", tasksRouts);

// For 404
app.use("*", (req, res) => res.status(404).json("Not found 404"));

// Apply Error
app.use((err, req, res, next) => {
  if (err) return res.status(err["cause"] || 500).json({ message: err.message });
});

// Server
app.listen(+process.env.PORT, () => console.log("Server is running..."));
