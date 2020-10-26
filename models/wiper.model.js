const mongoose = require("mongoose")

const WiperSchema = mongoose.Schema({
	name: {type: String, required: true},
	drawing: {type: Number, required: true},
  mold: {type: Number, required: true}
})

const Wiper = mongoose.model("Wiper", WiperSchema);

module.exports = Wiper;
