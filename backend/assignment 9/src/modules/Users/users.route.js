import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { validationCore } from "../../middlewares/validations.js";
import { allowExtensionsTypes, uploadFiles } from "../../services/uploadFiles.js";
import { errorHandler } from "../../utils/errorHandler.js";
import {
  changePassword,
  confirmEmail,
  deleteCoverPicture,
  deleteProfilePicture,
  deleteUser,
  generateDataAsQrcode,
  logOut,
  signIn,
  signUp,
  softDelete,
  updateUser,
  uploadCoverPictures,
  uploadProfilePicture,
} from "./users.controller.js";
import {
  changePasswordSchema,
  signInSchema,
  signUpSchema,
  updateUserSchema,
} from "./users.validationSchema.js";
import { uploadFilesWithCloud } from "../../services/uploadFiles.cloud.js";

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
router.post(
  "/profile",
  uploadFilesWithCloud(allowExtensionsTypes.image).single("profilePic"),
  errorHandler(uploadProfilePicture)
);
router.post(
  "/covers",
  uploadFilesWithCloud(allowExtensionsTypes.image).array("coverPic", 3),
  errorHandler(uploadCoverPictures)
);
router.delete("/profile", errorHandler(deleteProfilePicture));
router.delete("/covers", errorHandler(deleteCoverPicture));
router.post("/generate-qrcode", errorHandler(generateDataAsQrcode));

export default router;
