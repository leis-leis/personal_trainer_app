const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys").secret;
const User = require("../../models/User");

router.post("/register", async (req, res) => {
  let { login, pass, passConfirm, name, surname, email, phone } = req.body;
  
  if(!login){
    return res.json({
      msg: "Nie podano loginu",
      success: false,
    });
  }
  if(!pass){
    return res.json({
      msg: "Nie podano hasła",
      success: false,
    });
  }
  if(!passConfirm){
    return res.json({
      msg: "Nie potwierdzono hasła",
      success: false,
    });
  }
  if(!name){
    return res.json({
      msg: "Nie podano imienia",
      success: false,
    });
  }
  if(!surname){
    return res.json({
      msg: "Nie podano nazwiska",
      success: false,
    });
  }
  if(!email){
    return res.json({
      msg: "Nie podano emaila",
      success: false,
    });
  }
  if(!phone){
    return res.json({
      msg: "Nie podano numeru telefonu",
      success: false,
    });
  }

  if (pass !== passConfirm) {
    return res.json({
      msg: "Hasła nie są identyczne.",
      success: false,
    });
  }

  const userByName = await User.findOne({
    login: login,
  });

  if (userByName) {
    return res.json({
      msg: "Użytkownik o podanym loginie już istnieje",
      success: false,
    });
  }

  const userByEmail = await User.findOne({
    email: email,
  });

  if (userByEmail) {
    return res.json({
      msg: "Użytkownik o podanym Emailu już istnieje",
      success: false,
    });
  }

  const userByPhone = await User.findOne({
    phone: phone,
  });

  if (userByPhone) {
    return res.json({
      msg: "Użytkownik o numerze telefonu już istnieje",
      success: false,
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
  if(req.body.login == ""){
    return res.json({
      msg: "Nie podano loginu",
      success: false,
    });
  }
  if(req.body.pass == ""){
    return res.json({
      msg: "Nie podano hasła",
      success: false,
    });
  }
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

  //console.log(found.blocked)
  if(found.blocked){
    return res.json({
      msg: "Twoje konto zostało zablokowane. Skontaktuj się z właścicielem serwisu.",
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
    joinDate: found.joinDate,
    lastOnline: found.lastOnline
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

router.post("/modify", async (req, res) => {
    var hash = null
    const u = JSON.parse(req.body.user)
    const found = await User.findOne({ _id: u._id });

    const isMatch = await bcrypt.compare(req.body.pass, found.pass);
    if (!isMatch) {
      return res.json({
        msg: "Podano nieprawidłowe hasło.",
        success: false,
      });
    }

    const checkForLogin = await User.findOne({login: req.body.login})
    if(checkForLogin.login != found.login){
      return res.json({
        msg: "Podany login jest już zajęty",
        success: false,
      })
    }
    
    if(req.body.newPass == "" && req.body.confirmPass != ""){
      return res.json({
        msg: "Nie podano nowego hasła",
        success: false,
      })
    }
    if(req.body.newPass != "" && req.body.confirmPass == ""){
      return res.json({
        msg: "Nie potwierdzono nowego hasła",
        success: false,
      })
    }

    if(req.body.newPass != "" && req.body.confirmPass != ""){
      if(req.body.newPass == req.body.confirmPass){
        hash = await bcrypt.hash(req.body.newPass, 10)
      }else{
        return res.json({
          msg: "Nowe hasła nie są identyczne.",
          success: false,
        })
      }
    }
    var update
    update = {
      login: req.body.login,
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      email: req.body.email,
    }

    if(hash != null){
      update.pass = hash
    }
    let updateFound = await User.findOneAndUpdate({_id: u._id}, update, {new: true})
  
    //console.log(updateFound)

    if(hash == null){
      return res.json({
        success: true,
        user: updateFound,
        password: req.body.pass,
        login: updateFound.login,
        msg: "Zaktualizowano informacje",
      });
    }else{
      return res.json({
        success: true,
        user: updateFound,
        password: req.body.newPass,
        login: updateFound.login,
        msg: "Zaktualizowano informacje",
      });
    }
  }
)

router.get("/users", async (req, res) => {
  const users = await User.find({});

  return res.json({
    success: true,
    users: users,
  })
})
module.exports = router; 