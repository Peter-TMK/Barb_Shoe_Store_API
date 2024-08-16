const joi = require("joi");
const userModel = require("../models/user.model");

const uniqueEmail = async (value, helper) => {
  const existingTaskTitle = await userModel.findOne({ email: value });
  if (existingTaskTitle) {
    throw new Error("Each User's Email Must Be Unique!");
  }
  return value;
};

const validateRegister = joi.object({
  name: joi.string().required().min(5).max(50),
  email: joi
    .string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ng", "co", "za", "uk"] },
    })
    .external(uniqueEmail),
  password: joi.string().required(),
  role: joi.string(),
});

const validateUserUpdate = joi.object({
  name: joi.string().required().min(5).max(50),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ng", "co", "za", "uk"] },
    })
    .external(uniqueEmail),
  // password: joi.string().required(),
  role: joi.string(),
});

async function validateRegisterMiddleWare(req, res, next) {
  const payload = req.body;
  try {
    await validateRegister.validateAsync(payload, { abortEarly: false });
    next();
  } catch (error) {
    // res.status(400).json({ error: error.details[0].message });
    next({
      // message: error.details[0].message,
      message: error.message,
      status: 400,
    });
  }
}

async function validateUserUpdateMiddleware(req, res, next) {
  const payload = req.body;
  try {
    await validateUserUpdate.validateAsync(payload, { abortEarly: false });
    next();
  } catch (error) {
    // res.status(400).json({ error: error.details[0].message });
    next({
      // message: error.details[0].message,
      message: error.message,
      status: 400,
    });
  }
}

module.exports = {
  validateRegisterMiddleWare,
  validateUserUpdateMiddleware,
};

// const { body, validationResult } = require("express-validator");

// // Validation rules
// const validateRegisterUser = [
//   body("name").notEmpty().withMessage("Name is required"),
//   body("email").isEmail().withMessage("Invalid email format"),
//   body("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long"),

//   // Middleware to handle validation errors
//   async (req, res, next) => {
//     const errors = await validationResult(req);
//     if (!errors.isEmpty()) {
//       const error = new Error("Validation failed");
//       error.status = 400;
//       error.details = errors.array();
//       return next(error);
//     }
//     next();
//   },
// ];

// module.exports = {
//   validateRegisterUser,
// };
