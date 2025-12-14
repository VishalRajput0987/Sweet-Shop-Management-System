// const express = require("express");
// const {
//   createSweet,
//   getSweets,
//   searchSweets,
//   updateSweet,
//   deleteSweet,
//   purchaseSweet,
//   restockSweet
// } = require("../controllers/sweetController");
// const protect = require("../middleware/auth");
// const isAdmin = require("../middleware/isAdmin");

// const router = express.Router();

// router.use(protect);

// router.post("/", createSweet);
// router.get("/", getSweets);
// router.get("/search", searchSweets);
// router.put("/:id", updateSweet);
// router.delete("/:id", isAdmin, deleteSweet);

// router.post("/:id/purchase", purchaseSweet);
// router.post("/:id/restock", isAdmin, restockSweet);

// module.exports = router;


// src/routes/sweetRoutes.js
// --- APPLY THIS CODE ---

const express = require("express");
const {
    createSweet,
    getSweets,
    searchSweets,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet
} = require("../controllers/sweetController");
const protect = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Apply the 'protect' middleware to all routes in this router.
// This ensures no sweet shop data can be accessed without a valid JWT.
router.use(protect);

// 1. CREATE SWEET (Admin Only)
router.post("/", isAdmin, createSweet); // <-- CORRECTED: Added isAdmin

// 2. READ / LIST SWEETS (Authenticated Access)
router.get("/", getSweets);
router.get("/search", searchSweets);

// 3. UPDATE SWEET (Admin Only)
router.put("/:id", isAdmin, updateSweet); // <-- CORRECTED: Added isAdmin

// 4. DELETE SWEET (Admin Only)
router.delete("/:id", isAdmin, deleteSweet); // Already correct

// 5. USER ACTIONS (Authenticated Access)
router.post("/:id/purchase", purchaseSweet);
router.post("/:id/restock", isAdmin, restockSweet); // Already correct

module.exports = router;