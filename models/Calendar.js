var mongoose = require("mongoose");

var calendarSchema = mongoose.Schema({
  desiredDate: { type: String, required: true, unique: true }, //wybrana data
  title: { type: String, required: true },
  desc: { type: String, },
  type: { type: String, required: true }, //typ (wizyta u trenera, wizyta u klienta, konsultacja online)
  address: {
    city: { type: String },
    street: { type: String },
    houseNo: { type: String },
  }, //przy wizycie u klienta
  isOpen: { type: Boolean, required: true, default: false }, // czy termin jest wolny
  confimed: { type: Boolean, required: true, default: false }, //potwierdzenie terminu przez trenera
  date: { type: String }, //data wybrania terminu
  user: { type: mongoose.Types.ObjectId, ref: "User" }
});

var Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;
