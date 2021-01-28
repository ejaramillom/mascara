const mongoose = require("mongoose")

const BrushSchema = mongoose.Schema({
	brush: {type: String, required: true},
	original: {type: String, required: true},
  shaftDiameter: {type: Number, required: true},
  shaftLength: {type: Number, required: true},
  brushDiameter: {type: Number, required: true},
  brushLength: {type: Number, required: true},
  supplier: {type: String},
  type: {type: String},
	claim: {
		definition: {type: Boolean},
		volumizing: {type: Boolean},
		lengthening: {type: Boolean},
		curling: {type: Boolean},
		plumping: {type: Boolean},
	}
})

const Brush = mongoose.model("Brush", BrushSchema);

module.exports = { Brush, BrushSchema };
