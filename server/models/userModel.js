const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  password: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

userSchema.methods.addToProducts = function (productId) {
  console.log("method çalıştı");
  const currentProducts = this.products;
  currentProducts.push(productId);
  this.products = currentProducts;
  console.log(currentProducts);
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
