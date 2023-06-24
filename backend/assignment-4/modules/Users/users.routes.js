import { Router } from "express";
import {
  addUser,
  checkId,
  checkUserExist,
  deleteUser,
  getAllUsers,
  getAllUsersWithProducts,
  searchByUser,
  searchUsersIds,
  updateUser,
} from "./users.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/", checkUserExist, addUser);
router.patch("/:id", checkId, updateUser);
router.delete("/:id", checkId, deleteUser);
router.get("/:search", searchByUser);
router.get("/search/ids", searchUsersIds);
router.get("/with/products", getAllUsersWithProducts);

export default router;
