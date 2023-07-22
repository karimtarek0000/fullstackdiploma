import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { errorHandler } from "../../utils/errorHandler.js";
import {
  addTask,
  deleteTask,
  getAllTaskAfterDeadline,
  getAllTasksWithLogin,
  getAllTasksWithUserData,
  updateTask,
} from "./tasks.controller.js";
import { validationCore } from "../../middlewares/validations.js";
import { addTaskSchema, deleteTaskSchema, updateTaskSchema } from "./tasks.validationSchema.js";

const router = Router();

router.get("/with-users", errorHandler(getAllTasksWithUserData));
router.get("/after-deadline", errorHandler(getAllTaskAfterDeadline));

router.all("*", errorHandler(auth));

router.get("/", errorHandler(getAllTasksWithLogin));
router.post("/", validationCore(addTaskSchema), errorHandler(addTask));
router.patch("/:id", validationCore(updateTaskSchema), errorHandler(updateTask));
router.delete("/:id", validationCore(deleteTaskSchema), errorHandler(deleteTask));

export default router;
