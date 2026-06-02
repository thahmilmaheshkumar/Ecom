import express from "express";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  getAllProducts,
  reviewProduct,
  singleProduct,
  updateProduct,
} from "../controller/productcontroller.js";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";

const router = express.Router();

router
  .route("/products")
  .post(auth, role("admin"), createProduct)
  .get(getAllProducts)
  .put(auth, role("admin"), updateProduct)
  .delete(auth, role("admin"), deleteProduct);
router.route("/product").get(singleProduct);
router.route("/product/review").post(auth, role("user"), reviewProduct);
router.route("/admin/products").get(auth, role("admin"), getAdminProducts);

export default router;
