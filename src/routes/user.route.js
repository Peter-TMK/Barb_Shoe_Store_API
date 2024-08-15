const express = require("express");
const userRouter = express.Router();

// const {
//   validateTaskPostMiddleWare,
//   validateTaskUpdateMiddleWare,
//   validateUserUpdateMiddleware,
// } = require("../middleware/validator.middleware");

// const validateObjectID = require("../middleware/validateObjectID.middleware");
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const authenticate = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// userRouter.get("/search", searchTaskByTitle);

userRouter.get("/", authenticate, roleMiddleware("admin"), getAllUsers);

userRouter.get(
  "/:id",
  authenticate,
  // roleMiddleware("admin"),
  // validateObjectID,
  getSingleUser
);

// userRouter.post("/", validateTaskPostMiddleWare, postTask);

userRouter.put(
  "/:id",
  authenticate,
  // roleMiddleware("admin"),
  // validateObjectID,
  // validateUserUpdateMiddleware,
  updateUser
);

userRouter.delete(
  "/:id",
  authenticate,
  // roleMiddleware("admin"),
  deleteUser
);

module.exports = userRouter;
