import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  searchUser,
  signIn,
  signUp,
  updateUser,
} from "./users.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/", signUp);
router.post("/sign-in", signIn);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/search", searchUser);

export default router;
