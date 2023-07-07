import { Router } from "express";
import {
  addPost,
  allPosts,
  allPostsWithUsers,
  checkUser,
  deletePost,
  sortPosts,
  updatePost,
} from "./post.controller.js";

const router = Router();

router.get("/", allPosts);
router.get("/sort", sortPosts);
router.get("/with-user", allPostsWithUsers);
router.post("/", checkUser, addPost);
router.delete("/", deletePost);
router.patch("/", updatePost);

export default router;
