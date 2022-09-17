const User = require("../models/userModel");
const Product = require("../models/productModel");

exports.addProduct = async (req, res, next) => {
  const {
    name,
    description,
    images,
    price,
    userId,
    category,
    width,
    height,
    depth,
    color,
    situation,
  } = req.body;

  if (
    !name ||
    !description ||
    !images ||
    !price ||
    !userId ||
    !category ||
    !width ||
    !height ||
    !depth ||
    !color ||
    !situation
  ) {
    return res
      .status(404)
      .json({ message: "İlan oluşturulamadı. Lütfen tüm alanları doldurun." });
  }

  const product = new Product({
    name,
    description,
    images,
    price,
    userId,
    category,
    width,
    height,
    depth,
    color,
    situation,
  });

  await product.save();
  const user = await User.findById(userId);
  user.addToProducts(product._id);

  res.status(201).json({ message: "ilan oluşturuldu", product: product });
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .sort({ updatedAt: -1 })
      .populate("userId");
    res.status(200).json({ products });
  } catch (error) {}
};

exports.getCategory = async (req, res, next) => {
  let categoryName =
    req.params.categoryName.charAt(0).toUpperCase() +
    req.params.categoryName.slice(1);
  if (categoryName.includes("Bahce")) {
    categoryName = "Bahçe ve Balkon";
  }
  if (categoryName.includes("Masa")) {
    categoryName = "Masa ve Sandalye";
  }
  if (categoryName.includes("Beyaz")) {
    categoryName = "Beyaz Eşya";
  }
  if (categoryName.includes("Aydinlatma")) {
    categoryName = "Aydınlatma";
  }
  try {
    const products = await Product.find({ category: categoryName }).populate(
      "userId"
    );
    return res.status(200).json({ products });
  } catch (error) {}
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findOne({ _id: productId }).populate("userId");
  return res.status(200).json({ product });
};

exports.getUserProducts = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId).populate("products");
  return res.status(200).json({ user });
};
