import { Router } from "express";
import {
  allUsers,
  deleteUser,
  searchUserBetweenAges,
  searchUserNameAndAge,
  signIn,
  signUp,
  updateUser,
  allUsersWithPosts,
} from "./user.controller.js";

const router = Router();

router.get("/", allUsers);
router.get("/with-posts/:userId", allUsersWithPosts);
router.post("/", signUp);
router.post("/auth", signIn);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.post("/search-one", searchUserNameAndAge);
router.post("/search-two", searchUserBetweenAges);

export default router;
