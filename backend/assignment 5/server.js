import express from "express";

import usersRoutes from "./modules/Users/users.routes.js";
import notesRouter from "./modules/Notes/notes.routes.js";
import { dbConnection } from "./DB/connections.js";

// Express
const app = express();
app.use(express.json());

// Database
dbConnection();

// Routes
app.use("/users", usersRoutes);
app.use("/notes", notesRouter);

// Server
app.listen(3000, () => console.log("Server is running..."));
