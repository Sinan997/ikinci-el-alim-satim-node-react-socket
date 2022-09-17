const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const messageRoutes = require("./routes/messageRoute");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const socket = require("socket.io");

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/message", messageRoutes);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).array("file");

app.post("/api/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    return res.status(200).send(req.files);
  });
});

mongoose.connect("mongodb://0.0.0.0:27017/spotcu").then(() => {
  console.log("Database connected");
});

const server = app.listen(8000, () => {
  console.log("server is running at: http://localhost:8000");
});

const io = socket(server, {
  cors: { origin: "http://localhost:3000" },
  credentials: true,
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  console.log(global.onlineUsers);
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-message", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("message-receive", data.message);
    }
  });
});
