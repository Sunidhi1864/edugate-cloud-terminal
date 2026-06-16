/*const mongoose = require("mongoose");

const PassSchema = new mongoose.Schema({
  visitorName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "CheckedIn", "Expired"],
    default: "Active", // shuru mein pass Active rahega
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pass", PassSchema);*/

global.mockDatabase = global.mockDatabase || [];

module.exports = {
  modelName: "Pass",
};
