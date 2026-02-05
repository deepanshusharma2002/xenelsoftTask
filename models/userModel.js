const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    status: { type: Number, required: true, default: 1 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
