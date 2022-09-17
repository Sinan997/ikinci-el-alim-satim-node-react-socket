const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/:userId", userController.getUser);

router.post("/update/:userId", userController.updateUser);

module.exports = router;
