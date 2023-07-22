import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { validationCore } from "../../middlewares/validations.js";
import { errorHandler } from "../../utils/errorHandler.js";
import {
  changePassword,
  confirmEmail,
  deleteUser,
  logOut,
  signIn,
  signUp,
  softDelete,
  updateUser,
} from "./users.controller.js";
import {
  changePasswordSchema,
  signInSchema,
  signUpSchema,
  updateUserSchema,
} from "./users.validationSchema.js";

const router = Router();

router.post("/", validationCore(signUpSchema), errorHandler(signUp));
router.post("/sign-in", validationCore(signInSchema), errorHandler(signIn));
router.get("/confirm-email/:token", errorHandler(confirmEmail));

router.all("*", errorHandler(auth));

router.patch(
  "/change-password",
  validationCore(changePasswordSchema),
  errorHandler(changePassword)
);
router.patch("/update-profile", validationCore(updateUserSchema), errorHandler(updateUser));
router.delete("/delete-profile", errorHandler(deleteUser));
router.patch("/soft-delete-profile", errorHandler(softDelete));
router.patch("/logout", errorHandler(logOut));

export default router;
