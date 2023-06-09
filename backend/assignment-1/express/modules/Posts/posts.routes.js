const { Router } = require("express");
const {
  getAllPosts,
  addPost,
  deletePost,
  updatePost,
  getPost,
} = require("./posts.controller");

const router = Router();

router.get("/posts", getAllPosts);
router.post("/posts", addPost);
router.get("/posts/:id", getPost);
router.delete("/posts/:id", deletePost);
router.patch("/posts/:id", updatePost);

module.exports = router;
