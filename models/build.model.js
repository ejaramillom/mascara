const mongoose = require("mongoose")

const BuildSchema = mongoose.Schema({
	bottleName: {type: String, required: true}
})

const Build = mongoose.model("Build", BuildSchema);

module.exports = Build;
