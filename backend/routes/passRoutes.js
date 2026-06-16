const express = require("express");
const router = express.Router();

// 1. GET: Fetch all passes
router.get("/all-passes", (req, res) => {
  try {
    const mockData = global.mockDatabase || [];
    res
      .status(200)
      .json({ success: true, count: mockData.length, data: mockData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. POST: Create a new pass
router.post("/create-pass", (req, res) => {
  try {
    const { name, purpose } = req.body;
    if (!name || !purpose) {
      return res
        .status(400)
        .json({ success: false, message: "Details are missing!" });
    }

    const mockData = global.mockDatabase || [];
    const newPass = {
      id: "PASS-" + Math.floor(1000 + Math.random() * 9000), // Professional ID Format
      name,
      purpose,
      status: "Active",
      timeIn: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    mockData.unshift(newPass); // Naya pass sabse upar dikhega
    global.mockDatabase = mockData;

    res.status(201).json({ success: true, data: newPass });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. PUT: Update status (Checkout Visitor)
router.put("/checkout-pass/:id", (req, res) => {
  try {
    const { id } = req.params;
    let mockData = global.mockDatabase || [];

    mockData = mockData.map((pass) => {
      if (pass.id === id) {
        return { ...pass, status: "Checked Out" };
      }
      return pass;
    });

    global.mockDatabase = mockData;
    res
      .status(200)
      .json({ success: true, message: "Visitor checked out successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. DELETE: Remove log completely
router.delete("/delete-pass/:id", (req, res) => {
  try {
    const { id } = req.params;
    let mockData = global.mockDatabase || [];

    global.mockDatabase = mockData.filter((pass) => pass.id !== id);
    res.status(200).json({ success: true, message: "Log deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
