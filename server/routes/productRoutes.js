const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/addProduct", productController.addProduct);

router.get("/getAllProducts", productController.getAllProducts);

router.get("/category/:categoryName", productController.getCategory);

router.get("/product/:productId", productController.getProduct);

router.get("/getUserProducts/:userId", productController.getUserProducts);

module.exports = router;
