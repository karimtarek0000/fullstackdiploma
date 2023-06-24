import express, { json } from "express";

import usersRoutes from "./modules/Users/users.routes.js";
import productsRoutes from "./modules/Products/products.routes.js";

// Express
const app = express();
app.use(json());

// Routes
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

// Server
app.listen(3000, () => console.log("Server is running..."));
