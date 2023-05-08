var mongoose = require("mongoose");

var exerciseSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  videoLink: { type: String },
  photos : [{
    photo: {type: String},
    desc: {type: String},
  }],
  creator: { type: mongoose.Types.ObjectId, ref: "User" }
});

var Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise; 
