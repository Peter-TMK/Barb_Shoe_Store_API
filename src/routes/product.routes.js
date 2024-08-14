const express = require("express");
const productRouter = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  hideProduct,
} = require("../controllers/product.controller");

const authenticate = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

productRouter.post("/", createProduct);
productRouter.get("/", authenticate, roleMiddleware("client"), getProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", editProduct);
productRouter.post("/:id", hideProduct);

module.exports = productRouter;
