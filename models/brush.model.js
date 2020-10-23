const mongoose = require("mongoose")

const BottleSchema = mongoose.Schema({
	name: {type: String, required: true},
	drawing: {type: Integer, required: true},
  mold: {type: Integer, required: true},
  depth: {type: Integer, required: true},
  thread: {type: String, required: true}
})

const Bottle = mongoose.model("Bottle", BottleSchema);

module.exports = Bottle;
