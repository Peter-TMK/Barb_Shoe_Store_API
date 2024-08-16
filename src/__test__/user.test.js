const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = require("../../app"); // Adjust path to your Express app
const userModel = require("../models/user.model");
// const User = require('../models/user.model');

describe("User Authentication", () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  afterAll(async () => {
    // Disconnect from the database and clean up
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clean up the test database after each test
    await userModel.deleteMany({});
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
  });

  it("should not register a user with an existing email", async () => {
    await new userModel({
      name: "Jane Doe",
      email: "janedoe@example.com",
      password: "password123",
    }).save();

    const res = await request(app).post("/api/auth/register").send({
      name: "John Doe",
      email: "janedoe@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "message",
      "Each User's Email Must Be Unique! (email)"
    );
  });

  it("should log in an existing user", async () => {
    const user = new userModel({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await bcrypt.hash("password123", 10),
    });
    await user.save();

    const res = await request(app).post("/api/auth/login").send({
      email: "johndoe@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not log in with invalid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "nonexistent@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Invalid email or password");
  });
});
