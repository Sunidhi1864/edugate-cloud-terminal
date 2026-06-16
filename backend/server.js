const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const passRoutes = require("./routes/passRoutes");

const app = express();
const PORT = 5000;

// 1. Middlewares
app.use(cors());
app.use(express.json()); // <--- Yeh line frontend ka form data read karne ke liye zaroori hai!
app.use(express.urlencoded({ extended: true })); // <--- ye line incoming form structre ko process kregi

// 2. Database Connection
connectDB();

// 3. API Routes
app.use("/api", passRoutes);

// Default Route (Check karne ke liye ki backend chal raha hai)
app.get("/", (req, res) => {
  res.send("Gate Security API is live...");
});

// 4. Start Server
app.listen(PORT, () => {
  console.log(`Server running smoothly on port ${PORT}`);
});
