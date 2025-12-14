const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const connectDB = require("../src/config/db");

beforeAll(async () => {
  process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sweet_shop_test";
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth API", () => {
  const userPayload = {
    name: "Test User",
    email: "test@example.com",
    password: "password123"
  };

  test("registers a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(userPayload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.email).toBe(userPayload.email);
  });

  test("does not register with existing email", async () => {
    const res = await request(app).post("/api/auth/register").send(userPayload);
    expect(res.status).toBe(400);
  });

  test("logins with correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: userPayload.email,
      password: userPayload.password
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});