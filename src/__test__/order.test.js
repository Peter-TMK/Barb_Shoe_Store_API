// const request = require("supertest");
// const mongoose = require("mongoose");
// const app = require("../../app"); // Adjust path to your Express app
// const orderModel = require("../models/order.model");
// const productModel = require("../models/product.model");
// // const bcrypt = require("bcryptjs");

// describe("Order API", () => {
//   beforeAll(async () => {
//     // Connect to the test database
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   });

//   afterAll(async () => {
//     // Disconnect from the database
//     await mongoose.connection.close();
//   });

//   afterEach(async () => {
//     // Clean up the test database after each test
//     await orderModel.deleteMany({});
//     await productModel.deleteMany({});
//   });

//   it("should create a new order", async () => {
//     const product = await productModel.create({
//       name: "Sample Product",
//       description: "This is a sample product",
//       price: 29.99,
//       stock: 100,
//     });

//     const res = await request(app)
//       .post("/api/orders")
//       .send({
//         products: [
//           {
//             productId: product._id,
//             quantity: 2,
//           },
//         ],
//         total: 59.98,
//         status: "Pending",
//       });

//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty("products");
//     expect(res.body.products[0]).toHaveProperty(
//       "productId",
//       product._id.toString()
//     );
//     expect(res.body.products[0]).toHaveProperty("quantity", 2);
//     expect(res.body).toHaveProperty("total", 59.98);
//     expect(res.body).toHaveProperty("status", "Pending");
//   });

//   it("should retrieve all orders", async () => {
//     const product = await productModel.create({
//       name: "Sample Product",
//       description: "This is a sample product",
//       price: 29.99,
//       stock: 100,
//     });

//     await orderModel.create({
//       products: [
//         {
//           productId: product._id,
//           quantity: 2,
//         },
//       ],
//       total: 59.98,
//       status: "Pending",
//     });

//     const res = await request(app).get("/api/orders");
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveLength(1);
//   });

//   it("should retrieve a single order by ID", async () => {
//     const product = await productModel.create({
//       name: "Sample Product",
//       description: "This is a sample product",
//       price: 29.99,
//       stock: 100,
//     });

//     const order = await orderModel.create({
//       products: [
//         {
//           productId: product._id,
//           quantity: 2,
//         },
//       ],
//       total: 59.98,
//       status: "Pending",
//     });

//     const res = await request(app).get(`/api/orders/${order._id}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("products");
//     expect(res.body.products[0]).toHaveProperty(
//       "productId",
//       product._id.toString()
//     );
//     expect(res.body.products[0]).toHaveProperty("quantity", 2);
//     expect(res.body).toHaveProperty("total", 59.98);
//     expect(res.body).toHaveProperty("status", "Pending");
//   });

//   it("should update an existing order", async () => {
//     const product = await productModel.create({
//       name: "Sample Product",
//       description: "This is a sample product",
//       price: 29.99,
//       stock: 100,
//     });

//     const order = await orderModel.create({
//       products: [
//         {
//           productId: product._id,
//           quantity: 2,
//         },
//       ],
//       total: 59.98,
//       status: "Pending",
//     });

//     const res = await request(app).put(`/api/orders/${order._id}`).send({
//       status: "Shipped",
//     });

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("status", "Shipped");
//   });

//   it("should delete an order by ID", async () => {
//     const product = await productModel.create({
//       name: "Sample Product",
//       description: "This is a sample product",
//       price: 29.99,
//       stock: 100,
//     });

//     const order = await orderModel.create({
//       products: [
//         {
//           productId: product._id,
//           quantity: 2,
//         },
//       ],
//       total: 59.98,
//       status: "Pending",
//     });

//     const res = await request(app).delete(`/api/orders/${order._id}`);
//     expect(res.statusCode).toEqual(204);

//     const orderCheck = await Order.findById(order._id);
//     expect(orderCheck).toBeNull();
//   });
// });
