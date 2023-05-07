var mongoose = require("mongoose");

var dietSchema = mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  plan:[{
    day: { type: Number, required: true, unique: true },
    carbs: { type: Number },
    fats: { type: Number },
    proteins: { type: Number },
    calories: { type: Number },
  }],
  isPublic: { type: Boolean, default: false },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  creator: { type: mongoose.Types.ObjectId, ref: "User" },
});

var Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
