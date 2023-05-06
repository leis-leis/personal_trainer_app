var mongoose = require("mongoose");

var workoutSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  excercises: [{ type: mongoose.Types.ObjectId, ref: "Excercise" }],
  isPublic: { type: Boolean, default: false },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  creator: { type: mongoose.Types.ObjectId, ref: "User" },
});

//podzial na dni jakis

var Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
