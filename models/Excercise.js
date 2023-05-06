var mongoose = require("mongoose");

var excerciseSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  videoLink: { type: String },
  photos : [{
    photo: {type: String},
    photoDesc: {type: String},
  }],
  creator: { type: mongoose.Types.ObjectId, ref: "User" }
});

var Excercise = mongoose.model("Excercise", excerciseSchema);

module.exports = Excercise;
