var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  login: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  joinDate: { type: Date, default: Date.now },
  lastOnline: { type: Date, default: Date.now }, //update przy przejsciu między stronami?
  blocked: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  workouts: [{ type: mongoose.Types.ObjectId, ref: "Workout" }],
  diets: [{ type: mongoose.Types.ObjectId, ref: "Diet" }],
});

var User = mongoose.model("User", userSchema);

module.exports = User;
