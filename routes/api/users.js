const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys").secret;
const User = require("../../models/User");

router.post("/register", async (req, res) => {
  let { login, pass, passConfirm, name, surname, email, phone } = req.body;

  if (pass !== passConfirm) {
    return res.json({
      msg: "Hasła nie są identyczne.",
    });
  }

  const userByName = await User.findOne({
    login: login,
  });

  if (userByName) {
    return res.json({
      msg: "Użytkownik o podanym loginie już istnieje",
    });
  }

  const userByEmail = await User.findOne({
    email: email,
  });

  if (userByEmail) {
    return res.json({
      msg: "Użytkownik o podanym Emailu już istnieje",
    });
  }

  const userByPhone = await User.findOne({
    phone: phone,
  });

  if (userByPhone) {
    return res.json({
      msg: "Użytkownik o numerze telefonu już istnieje",
    });
  }

  let newUser = new User({
    login,
    pass,
    name,
    surname,
    email,
    phone,
  });

  const hash = await bcrypt.hash(newUser.pass, 10);
  newUser.pass = hash;
  const saved = await newUser.save();

  return res.json({
    success: true,
    msg: "Rejestracja przebiegła pomyślnie.",
  });
});

router.post("/login", async (req, res) => {
  const found = await User.findOne({ login: req.body.login });
  if (!found) {
    return res.json({
      msg: "Użytkownik o podanym loginie nie istnieje.",
      success: false,
    });
  }

  const isMatch = await bcrypt.compare(req.body.pass, found.pass);
  if (!isMatch) {
    return res.json({
      msg: "Nieprawidłowe hasło.",
      success: false,
    });
  }

  const payload = {
    _id: found._id,
    login: found.login,
    name: found.name,
    surname: found.surname,
    email: found.email,
    phone: found.phone,
  };

  const token = await jwt.sign(payload, key, {
    expiresIn: 604800, //tydzień
  });

  res.json({
    success: true,
    token: `Bearer ${token}`,
    user: found,
    msg: "Jesteś teraz zalogowany/a",
  });
});



module.exports = router; 