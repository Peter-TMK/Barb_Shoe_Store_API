const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const userModel = require("../models/user.model");
const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");
const CartItem = require("../models/addToCart.model");
// const notificationModel = require("../models/notification.model");

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stockQuantity, variations, imageUrl } =
      req.body;

    const product = new productModel({
      name,
      description,
      price,
      stockQuantity,
      variations,
      imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    // res.status(400).json({ message: error.message });
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body);
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    // res.status(400).json({ message: error.message });
    next(error);
  }
};

const hideProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isHidden = req.body.isHidden;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    // res.status(400).json({ message: error.message });
    next(error);
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

const getProductsForClients = async (req, res, next) => {
  try {
    const products = await productModel.find({ isHidden: false });
    res.status(200).json(products);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

const getProductByIdForClients = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product || product.isHidden) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

// const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     // Convert string to MongoDB ObjectId
//     const productObjectId = new mongoose.Types.ObjectId(productId);

//     const product = await productModel.findById(productObjectId);
//     const orderProduct = orderModel.findOne(product);

//     if (!product || product.isHidden) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     await orderProduct.save();
//     // Simulate adding to cart
//     const cartItem = {
//       productId: product._id,
//       name: product.name,
//       quantity,
//       price: product.price,
//       totalPrice: product.price * quantity,
//     };

//     res.status(200).json({ message: "Product added to cart", cartItem });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const mongoose = require('mongoose');
// const Product = require('../models/Product'); // Adjust path as necessary
// const CartItem = require('../models/CartItem'); // Adjust path as necessary

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user && req.user._id; // Assuming user ID is stored in req.user after authentication
    // const productName = req.user.name;

    // Convert productId to ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Find the product
    const product = await productModel.findById(productObjectId);
    if (!product || product.isHidden) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the cart item already exists
    let cartItem = await CartItem.findOne({
      userId,
      productId: productObjectId,
      // productName,
    });

    if (cartItem) {
      // Update the quantity if the item is already in the cart
      cartItem.quantity += quantity;
    } else {
      // Create a new cart item
      cartItem = new CartItem({
        userId,
        productId: productObjectId,
        quantity,
        price: product.price,
        // totalAmount: quantity * product.price,
        // productName,
      });
    }

    // Save the cart item to the database
    await cartItem.save();

    res.status(200).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

// const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     const userId = req.user._id; // Ensure the userId is properly extracted from req.user after authentication

//     // Convert productId to ObjectId
//     const productObjectId = new mongoose.Types.ObjectId(productId);

//     // Find the product
//     const product = await productModel.findById(productObjectId);
//     if (!product || product.isHidden) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Check if the cart item already exists
//     let cartItem = await CartItem.findOne({
//       userId,
//       productId: productObjectId,
//     });

//     if (cartItem) {
//       // Update the quantity if the item is already in the cart
//       cartItem.quantity += quantity;
//     } else {
//       // Create a new cart item
//       cartItem = new CartItem({
//         userId, // This is where the userId is required
//         productId: productObjectId,
//         quantity,
//         price: product.price,
//       });
//     }

//     // Save the cart item to the database
//     await cartItem.save();

//     res.status(200).json({ message: "Product added to cart", cartItem });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// const addToCart = async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;
//     const product = await productModel.findById(productId);

//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const price = product.price * quantity;

//     let cartItem = await CartItem.findOne({ userId, productId });

//     if (cartItem) {
//       cartItem.quantity += quantity;
//       cartItem.price = cartItem.quantity * product.price;
//     } else {
//       cartItem = new CartItem({
//         userId: new mongoose.Types.ObjectId(userId),
//         productId: new mongoose.Types.ObjectId(productId),
//         quantity,
//         price,
//       });
//     }

//     await cartItem.save();
//     res.status(201).json(cartItem);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const completePurchase = async (req, res, next) => {
  try {
    const userId = req.user._id; // Ensure user is authenticated

    // Retrieve cart items for the user
    const cartItems = await CartItem.find({ userId });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    // Create order items
    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      name: item.name, // Ensure this field is included in CartItem schema
      quantity: item.quantity,
      price: item.price,
    }));

    // Create a new order
    const order = new orderModel({
      userId,
      items: orderItems,
      totalAmount,
      status: "pending", // Default status
    });

    // Save the order to the database
    await order.save();

    // Clear the user's cart
    await CartItem.deleteMany({ userId });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

// const completePurchase = async (req, res) => {
//   try {
//     const { cartItems } = req.body;

//     // Simulate processing the order
//     const order = {
//       items: cartItems,
//       totalAmount: cartItems.reduce(
//         (total, item) => total + item.quantity * item.price,
//         0
//       ),
//       status: "Pending",
//       createdAt: new Date(),
//     };

//     // Normally, save the order to the database here

//     res.status(201).json({ message: "Order placed successfully", order });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const getOrderDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate that id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    // Retrieve the order details from the database
    const order = await orderModel.findById(id).populate("items.productId"); // Adjust based on your schema

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Format the order details
    const formattedOrder = {
      id: order._id,
      items: order.items.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name, // Adjust based on your schema
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
    };

    res.status(200).json(formattedOrder);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

// const getOrderDetails = async (req, res) => {
//   try {
//     // Simulate retrieving order details
//     const order = {
//       id: req.params.id,
//       items: [
//         { productId: "12345", name: "Shoe Name", quantity: 2, price: 100 },
//       ],
//       totalAmount: 200,
//       status: "pending",
//       createdAt: new Date(),
//     };

//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const searchProductByName = async (req, res, next) => {
  const { name, status, sortBy, order, page = 1, limit = 2 } = req.query;

  let sortOptions = {};

  if (sortBy) {
    sortOptions[sortBy] = order === "desc" ? -1 : 1;
  }

  const skip = (page - 1) * limit;

  try {
    const filter = {};

    if (name) {
      filter.name = {
        $regex: name,
        $options: "i",
      };
    }

    if (status) {
      filter.status = {
        // $regex: tags,
        $in: status.split(","),
      };
    }
    const totalProducts = await productModel.countDocuments(filter);

    const products = await productModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      total: totalProducts,
      page: Number(page),
      pages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
  searchProductByName,
};
