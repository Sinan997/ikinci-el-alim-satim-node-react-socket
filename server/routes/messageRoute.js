const express = require("express");
const {
  addMessage,
  getAllMessages,
  getAllUserClients,
} = require("../controllers/messageController");
const router = express.Router();

router.post("/addMessage", addMessage);

router.post("/getAllMessages", getAllMessages);

router.get("/getAllUserClients/:userId", getAllUserClients);

module.exports = router;
