const mongoose = require("mongoose")

const RodSchema = mongoose.Schema({
	name: {type: String, required: true},
	drawing: {type: Number, required: true},
  mold: {type: Number},
  holder: {type: Number},
  cavity: {type: Number},
  thread: {type: String, required: true},
	dimensions: {
		length: {type: Number, required: true},
		rodDiameter: {type: Number, required: true},
		brushDiameter: {type: Number, required: true}
	},
	versionAssembly: {
		capsule: {
			mold: {type: Number},
			drawing: {type: String},
		},
		pin: {
			mold: {type: Number},
			drawing: {type: String},
		},
		pinHolder: {
			mold: {type: Number},
			drawing: {type: String},
		},
		threadedCore: {type: String},
		cavityInsert: {type: String},
		cavity: {type: String}
	},
	productAssemblies: {
		pa1: {type: Number},
		pa2: {type: Number},
		pa3: {type: Number},
		pa4: {type: Number},
		pa5: {type: Number},
		pa6: {type: Number},
		pa7: {type: Number},
		pa8: {type: Number},
		pa9: {type: Number},
		pa10: {type: Number}
	}
})

const Rod = mongoose.model("Rod", RodSchema);

module.exports = { Rod, RodSchema };
