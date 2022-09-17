const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { firstName, lastName, username, email, phoneNumber, password } =
    req.body;

  // checking is all inputs are filled
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !phoneNumber ||
    !password
  ) {
    return res.status(404).json({ message: "Lütfen tüm boşlukları doldurun." });
  }

  // checking is username valid
  const usernameCheck = await User.findOne({ username: username });
  if (usernameCheck) {
    return res
      .status(409)
      .json({ message: "Bu kullanıcı adı zaten kullanılıyor." });
  }

  // checking is email valid
  const emailCheck = await User.findOne({ email: email });
  if (emailCheck) {
    return res.status(409).json({ message: "Bu Email zaten kullanılıyor." });
  }

  //phoneNumber is Valid
  const phoneNumberCheck = await User.findOne({ phoneNumber: phoneNumber });
  if (phoneNumberCheck) {
    return res
      .status(409)
      .json({ message: "Bu Telefon numarası zaten kullanılıyor." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      products: [],
    });

    await newUser.save();
    return res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu" });
  } catch (error) {}
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // checking is all inputs are filled
  if (!email || !password) {
    return res.status(404).json({ message: "Lütfen tüm boşlukları doldurun." });
  }

  // checking is email valid
  const emailCheck = await User.findOne({ email: email });
  if (!emailCheck) {
    return res.status(409).json({ message: "Email bulunamadı." });
  }

  try {
    const user = await User.findOne({ email: email });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        "mysecretkey",
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        message: "Giriş yapıldı",
        token: token,
        expirationTime: new Date().getTime() + 1000 * 60 * 60 * 24,
        username: user.username,
        userId: user._id,
        email: email,
      });
    } else {
      return res.status(404).json({ message: "Şifre yanlış" });
    }
  } catch (error) {}
};

exports.getUser = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.status(200).json({ user });
};

exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { firstName, lastName, username, email, phoneNumber } = req.body;
  const user = await User.updateOne(
    { _id: userId },
    {
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
    }
  );

  return res.status(200).json({ user });
};
