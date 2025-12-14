const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const connectDB = require("../src/config/db");
const User = require("../src/models/User");
const generateToken = require("../src/utils/generateToken");

let token;

beforeAll(async () => {
  process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sweet_shop_test2";
  await connectDB();

  const user = await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: "password123",
    role: "admin"
  });
  token = generateToken(user._id.toString());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Sweets API", () => {
  test("creates a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 50
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Ladoo");
  });

  test("lists sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});