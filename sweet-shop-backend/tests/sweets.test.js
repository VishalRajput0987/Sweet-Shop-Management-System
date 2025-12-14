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

// ... existing code ...

describe("Sweets API", () => {
    // ... existing beforeAll, afterAll ...

    // --- Expanded Tests for POST /api/sweets ---
    test("should return 401 if unauthorized (no token) on POST /api/sweets", async () => {
        const res = await request(app)
            .post("/api/sweets")
            .send({
                name: "Jalebi",
                category: "Indian",
                price: 5,
                quantity: 80
            });

        // The 'protect' middleware should block this
        expect(res.status).toBe(401);
    });
    
    // You also need to test a non-admin user trying to create a sweet, 
    // which requires creating a regular user and their token.
    
    // --- Existing test: creates a new sweet ---
    test("creates a new sweet", async () => {
        // ... existing test code ...
    });

    // --- Tests for GET /api/sweets ---
    test("lists sweets", async () => {
        // ... existing test code ...
    });
    
    // --- Add a test to search sweets (TDD: RED) ---
    test("searches for sweets by name", async () => {
        // This test should fail or return an error if the search endpoint is not yet implemented.
        const res = await request(app)
            .get("/api/sweets/search?name=Ladoo")
            .set("Authorization", `Bearer ${token}`); // Admin token works fine

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].name).toBe("Ladoo");
    });

    // --- Add tests for PUT /api/sweets/:id (TDD: RED) ---
    test("updates a sweet's details", async () => {
        // 1. Get the ID of the sweet created in the first test
        const sweetRes = await request(app)
            .get("/api/sweets")
            .set("Authorization", `Bearer ${token}`);
        const sweetId = sweetRes.body[0]._id;

        // 2. Perform the update
        const updatedRes = await request(app)
            .put(`/api/sweets/${sweetId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ price: 15 }); // Only update the price

        expect(updatedRes.status).toBe(200);
        expect(updatedRes.body.price).toBe(15);
        expect(updatedRes.body.name).toBe("Ladoo"); // Name should remain the same
    });

    // --- Add tests for DELETE /api/sweets/:id (TDD: RED) ---
    test("deletes a sweet (Admin only)", async () => {
        // 1. Get the ID of the sweet created for this test
        const sweetToCreate = { name: "Rasgulla", category: "Bengali", price: 12, quantity: 40 };
        const createRes = await request(app)
            .post("/api/sweets")
            .set("Authorization", `Bearer ${token}`)
            .send(sweetToCreate);
        const sweetId = createRes.body._id;

        // 2. Perform the deletion
        const deleteRes = await request(app)
            .delete(`/api/sweets/${sweetId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(deleteRes.status).toBe(204); // Expect No Content on successful deletion

        // 3. Verify deletion by checking the list
        const checkRes = await request(app)
            .get("/api/sweets")
            .set("Authorization", `Bearer ${token}`);
        
        // Ensure the deleted item is no longer in the list
        expect(checkRes.body.some(sweet => sweet._id === sweetId)).toBe(false);
    });
});