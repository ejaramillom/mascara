const express = require ( "express" );
const mongoose = require ( "mongoose" );
const routes = require( "./routes" );

//conexion
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost:27017/mascaras",  { useNewUrlParser: true });
mongoose.set( "useFindAndModify", false );

const app = express();

app.use( express.static( __dirname + '../public' ));
app.use( express.urlencoded({ extended: true }));
app.use( express.json() );
app.use( "/", routes);

app.listen( 5000, () => console.log( "Listening on port 5000..." ))
