const mongoose = require("mongoose")

const RodSchema = mongoose.Schema({
	name: {type: String, required: true},
	drawing: {type: Number, required: true},
  mold: {type: Number, required: true},
  holder: {type: Number, required: true},
  cavity: {type: Number, required: true},
  thread: {type: String, required: true},
	dimensions: {
		lenght: {type: Number, required: true},
		rodDiameter: {type: Number, required: true},
		brushDiameter: {type: Number, required: true}
	},
	versionAssembly: {
		capsule: {
			mold: {type: Number, required: true},
			drawing: {type: String, required: true},
		},
		pin: {
			mold: {type: Number, required: true},
			drawing: {type: String, required: true},
		},
		pinHolder: {
			mold: {type: Number, required: true},
			drawing: {type: String, required: true},
		},
		threadedCore: {type: String, required: true},
		cavityInsert: {type: String, required: true},
		cavity: {type: String, required: true}
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

module.exports = Rod;
