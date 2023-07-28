import { nanoid } from "nanoid";
import multer from "multer";
import fs from "fs";

export const allowExtensionsTypes = {
  image: ["image/jpeg", "image/jpg", "image/png"],
  file: ["application/pdf"],
  video: ["video/mp4"],
};

export const uploadFiles = (allowExtensions = [], customPath = "") => {
  // ============== CUTSOM PATH ===============
  const path = `upload/${customPath}`;

  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

  // ============== STORAGE ===================
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, `${nanoid()}${file.originalname}`);
    },
  });

  // ============== FILTER ===================
  const fileFilter = function (req, file, cb) {
    if (allowExtensions.includes(file.mimetype)) return cb(null, true);

    // Error handling
    cb(new Error(`${file.mimetype} not valid`, { cause: "400" }), false);
  };

  return multer({ fileFilter, storage, limits: { files: 2 } });
};
