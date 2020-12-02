const mongoose = require("mongoose")

const BottleSchema = mongoose.Schema({
	name: {type: String, required: true},
	drawing: {type: String, required: true},
  mold: {type: Number, required: true},
  depth: {type: Number, required:true},
  thread: {type: String, required:true}
})

const Bottle = mongoose.model("Bottle", BottleSchema);

module.exports = { Bottle, BottleSchema };
