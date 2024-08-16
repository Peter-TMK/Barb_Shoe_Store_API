// const request = require("supertest");
// const mongoose = require("mongoose");
// // const bcrypt = require("bcryptjs");
// const app = require("../../app"); // Adjust path to your Express app
// const productModel = require("../models/product.model");

// describe("Product API", () => {
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
//     await productModel.deleteMany({});
//   });

//   it("should create a new product", async () => {
//     const res = await request(app).post("/api/products").send({
//       name: "Sample Product",
//       description: "This is a sample product",
//       price: 29.99,
//       stock: 50,
//       stockQuantity: 6,
//     });
//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty("name", "Sample Product");
//     expect(res.body).toHaveProperty("description", "This is a sample product");
//     expect(res.body).toHaveProperty("price", 29.99);
//     expect(res.body).toHaveProperty("stock", 50);
//     expect(res.body).toHaveProperty("stockQuantity", 6);
//   });

//   it("should retrieve all products", async () => {
//     await productModel.create({
//       name: "Sample Product 1",
//       description: "This is a sample product 1",
//       price: 19.99,
//       stock: 100,
//       stockQuantity: 6,
//     });

//     await productModel.create({
//       name: "Sample Product 2",
//       description: "This is a sample product 2",
//       price: 39.99,
//       stock: 200,
//       stockQuantity: 6,
//     });

//     const res = await request(app).get("/api/products");
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveLength(2);
//   });

//   it("should retrieve a single product by ID", async () => {
//     const product = await productModel.create({
//       name: "Sample Product",
//       description: "This is a sample product",
//       price: 29.99,
//       stock: 50,
//       stockQuantity: 6,
//     });

//     const res = await request(app).get(`/api/products/${product._id}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("name", "Sample Product");
//     expect(res.body).toHaveProperty("description", "This is a sample product");
//     expect(res.body).toHaveProperty("price", 29.99);
//     expect(res.body).toHaveProperty("stock", 50);
//     expect(res.body).toHaveProperty("stockQuantity", 6);
//   });

//   it("should update an existing product", async () => {
//     const product = await productModel.create({
//       name: "Sample Product",
//       description: "This is a sample product",
//       price: 29.99,
//       stock: 50,
//       stockQuantity: 6,
//     });

//     const res = await request(app).put(`/api/products/${product._id}`).send({
//       name: "Updated Product",
//       price: 49.99,
//     });
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("name", "Updated Product");
//     expect(res.body).toHaveProperty("price", 49.99);
//     expect(res.body).toHaveProperty("stockQuantity", 6);
//   });

//   it("should delete a product by ID", async () => {
//     const product = await productModel.create({
//       name: "Sample Product",
//       description: "This is a sample product",
//       price: 29.99,
//       stock: 50,
//       stockQuantity: 6,
//     });

//     const res = await request(app).delete(`/api/products/${product._id}`);
//     expect(res.statusCode).toEqual(204);

//     const productCheck = await productModel.findById(product._id);
//     expect(productCheck).toBeNull();
//   });
// });
