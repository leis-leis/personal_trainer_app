var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  Login: { type: String, required: true, unique: true },
  Pass: { type: String, required: true },
  Name: { type: String, required: true },
  Surname: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Phone: { type: String, required: false, unique: true },
  JoinDate: { type: Date, default: Date.now },
  LastOnline: { type: Date, default: Date.now }, //update przy przejsciu między stronami?
  Blocked: { type: Boolean, default: false },
  IsAdmin: { type: Boolean, default: false },
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
