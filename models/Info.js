var mongoose = require("mongoose");

var infoSchema = mongoose.Schema({
  company: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  surname: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true, unique: true },
  postCode: { type: String, required: true, unique: true },
  street: { type: String, required: true, unique: true },
  houseNo: { type: String, required: true, unique: true },
});

var Info = mongoose.model("Info", infoSchema);

module.exports = Info;
