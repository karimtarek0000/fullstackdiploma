const express = require("express");

const app = express();

const userRouter = require("./modules/Users/users.routes");
const postRouter = require("./modules/Posts/posts.routes");

app.use(express.json());
app.use(userRouter, postRouter);

app.listen(4000, () => console.log("Server is running..."));
