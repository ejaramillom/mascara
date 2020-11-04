const mongoose = require("mongoose")
const BottleSchema = require("./bottle.model").BottleSchema;
const BrushSchema = require("./brush.model").BrushSchema;
const RodSchema = require("./rod.model").RodSchema;

const BuildSchema = mongoose.Schema({
	name: {type: String, required: true},
	bottle: BottleSchema,
	brush: BrushSchema,
	rod: RodSchema
})

const Build = mongoose.model("Build", BuildSchema);

module.exports = Build;
