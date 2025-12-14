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

router.use(protect);

router.post("/", createSweet);
router.get("/", getSweets);
router.get("/search", searchSweets);
router.put("/:id", updateSweet);
router.delete("/:id", isAdmin, deleteSweet);

router.post("/:id/purchase", purchaseSweet);
router.post("/:id/restock", isAdmin, restockSweet);

module.exports = router;