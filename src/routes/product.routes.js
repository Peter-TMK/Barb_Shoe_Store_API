const express = require("express");
const productRouter = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  hideProduct,
  //////////////,
  getProductsForClients,
  getProductByIdForClients,
  addToCart,
  completePurchase,
  getOrderDetails,
} = require("../controllers/product.controller");

const authenticate = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// admin routes
productRouter.post("/", authenticate, roleMiddleware("admin"), createProduct);
productRouter.get("/", authenticate, roleMiddleware("admin"), getProducts);
productRouter.get(
  "/:id",
  authenticate,
  roleMiddleware("admin"),
  getProductById
);
productRouter.put(
  "/:id",
  authenticate,
  authenticate,
  roleMiddleware("admin"),
  editProduct
);
productRouter.post("/:id", authenticate, roleMiddleware("admin"), hideProduct);

// client routes
productRouter.get(
  "/",
  authenticate,
  roleMiddleware("client"),
  getProductsForClients
);
productRouter.get(
  "/",
  authenticate,
  roleMiddleware("client"),
  getProductByIdForClients
);
productRouter.post(
  "/cart/:id",
  authenticate,
  roleMiddleware("client"),
  addToCart
);
productRouter.post(
  "/order/:id",
  authenticate,
  roleMiddleware("client"),
  completePurchase
);
productRouter.get(
  "/:id",
  authenticate,
  roleMiddleware("client"),
  getOrderDetails
);

module.exports = productRouter;
