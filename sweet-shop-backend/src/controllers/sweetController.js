const Sweet = require("../models/Sweet");

async function createSweet(req, res) {
  try {
    const { name, category, price, quantity, description, imageUrl } = req.body;

    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await Sweet.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Sweet with this name already exists" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      description,
      imageUrl
    });

    res.status(201).json(sweet);
  } catch (err) {
    console.error("Create sweet error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

async function getSweets(req, res) {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    res.json(sweets);
  } catch (err) {
    console.error("Get sweets error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

async function searchSweets(req, res) {
  try {
    // Extract filters from query params
    const { name, category, minPrice, maxPrice } = req.query;
    
    // Initialize filter object for Mongoose
    const filter = {};

    // 1. Filter by Name (Exact Match for Dropdown Selection)
    // If 'name' is provided (and not an empty string), use exact match.
    if (name) {
      filter.name = name; 
    }
    
    // 2. Filter by Category (Exact Match for Dropdown Selection)
    // If 'category' is provided (and not an empty string), use exact match.
    if (category) {
      filter.category = category;
    }
    
    // 3. Price Filter (Range)
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Find sweets matching ALL criteria in the filter object
    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (err) {
    console.error("Search sweets error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateSweet(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const sweet = await Sweet.findByIdAndUpdate(id, updates, { new: true });
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.json(sweet);
  } catch (err) {
    console.error("Update sweet error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteSweet(req, res) {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findByIdAndDelete(id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Delete sweet error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

async function purchaseSweet(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const qty = Number(quantity) || 1;

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }
    if (sweet.quantity < qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    sweet.quantity -= qty;
    await sweet.save();

    res.json(sweet);
  } catch (err) {
    console.error("Purchase sweet error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

async function restockSweet(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const qty = Number(quantity) || 1;

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += qty;
    await sweet.save();

    res.json(sweet);
  } catch (err) {
    console.error("Restock sweet error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
};