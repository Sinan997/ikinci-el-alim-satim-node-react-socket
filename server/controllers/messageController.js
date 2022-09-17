const Message = require("../models/messageModel");
const User = require("../models/userModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = new Message({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    await data.save();
    if (data) {
      return res.json({ msg: "Message added succesfully" });
    } else {
      return res.json({ msg: "failed to add message to the database" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({ users: { $all: [from, to] } }).sort({
      updatedAt: 1,
    });

    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectMessages);
  } catch (error) {
    next(error);
  }
};

exports.getAllUserClients = async (req, res, next) => {
  const userId = req.params.userId;
  const messages = await Message.find({ users: { $all: [userId] } }).select([
    "users",
    "username",
  ]);
  const allMessagesUsers = [];
  for (let i = 0; i < messages.length; i++) {
    allMessagesUsers.push(messages[i]);
  }

  const clients = [];
  for (let i = 0; i < allMessagesUsers.length; i++) {
    clients.push(allMessagesUsers[i].users.find((user) => user !== userId));
  }
  let uniqueClients = [...new Set(clients)];

  const allClients = await User.find({ _id: { $in: uniqueClients } });

  return res.json(allClients);
};
