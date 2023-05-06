var mongoose = require("mongoose");

var dietSchema = mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  plan:[{
    
  }],
  isPublic: { type: Boolean, default: false },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  creator: { type: mongoose.Types.ObjectId, ref: "User" },
});

//podzial na dni jakis

var Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
