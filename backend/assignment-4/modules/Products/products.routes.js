import { Router } from "express";
import {
  addNewProduct,
  checkProduct,
  deleteProduct,
  getAllProducts,
  searchProduct,
  updateProduct,
} from "./products.controller.js";

const router = Router();

router.get("/", getAllProducts);
router.post("/", checkProduct, addNewProduct);
router.get("/search", searchProduct);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
