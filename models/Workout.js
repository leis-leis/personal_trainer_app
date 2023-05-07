var mongoose = require("mongoose");

var workoutSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  plan: [{
    day: { type: Number, required: true, unique: true },
    excercises: [{ type: mongoose.Types.ObjectId, ref: "Excercise" }],
  }],
  isPublic: { type: Boolean, default: false },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  creator: { type: mongoose.Types.ObjectId, ref: "User" },
});

var Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
