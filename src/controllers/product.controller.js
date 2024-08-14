const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const userModel = require("../models/user.model");
const productModel = require("../models/product.model");
const notificationModel = require("../models/notification.model");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stockQuantity, variations } = req.body;

    const product = new productModel({
      name,
      description,
      price,
      stockQuantity,
      variations,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body);
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const hideProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isHidden = req.body.isHidden;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

////////////// PENDING BELOW ////////////////////////////////
// const getNotifications = async (req, res) => {
//   try {
//     const notifications = await notificationModel.find();
//     res.status(200).json(notifications);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
////////////// PENDING ABOVE ////////////////////////////////

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  hideProduct,
};
