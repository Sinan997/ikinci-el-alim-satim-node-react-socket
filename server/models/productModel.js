const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    images: [{ type: String }],
    price: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    category: { type: String },
    width: { type: String },
    height: { type: String },
    depth: { type: String },
    color: { type: String },
    situation: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
