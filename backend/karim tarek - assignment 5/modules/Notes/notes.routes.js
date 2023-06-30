import { Router } from "express";
import {
  addNote,
  checkOwner,
  deleteNote,
  getAllNotes,
  updateNote,
} from "./notes.controller.js";

const router = Router();

router.get("/", getAllNotes);
router.post("/", addNote);
router.delete("/", checkOwner, deleteNote);
router.patch("/", checkOwner, updateNote);

export default router;
