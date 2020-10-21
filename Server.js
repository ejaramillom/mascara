const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const path = require('path')
const app = express();
const moviesRouter = require('./routes/movies.js');
const usersRouter = require('./routes/users.js');
const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;
require('dotenv').config();

mongoose.connect( uri || "mongodb://localhost:27017/movies", { useNewUrlParser:true, useUnifiedTopology: true,useCreateIndex: true}), (err)=>{
  if(err) throw err;
  console.log("MongoDB connection established")
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use('/api/movies', moviesRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
