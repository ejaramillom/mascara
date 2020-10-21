const mongoose = require("mongoose")
// const User = require("../models/user.model.js");


const BottleSchema = mongoose.Schema({
	name: {type: String, required: true},
	drawing: {type: String, required: true},
	// user:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  api_movie_id: {type: String, required: true},
  poster_path: {type:String, required:true}
})

const Bottle = mongoose.model("Bottle", BottleSchema);

module.exports = Bottle;
