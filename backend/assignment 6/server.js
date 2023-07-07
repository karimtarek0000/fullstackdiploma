import express from "express";
import { dbConnection } from "./DB/connection.js";
import usersRoutes from "./modules/User/user.routes.js";
import postsRoutes from "./modules/Post/post.routes.js";

// Express
const app = express();
app.use(express.json());

// Database
dbConnection();

// Routes
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

// Server
app.listen(3000, () => console.log("Server is running..."));
