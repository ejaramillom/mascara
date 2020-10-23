const express = require( "express" );
const router = express.Router();
const Bottle = require( "./models/bottle.model" );
// const axios = require( "axios" );

router.get( "/", async ( req, res, next ) => {
  try {
    console.log( "succesfully fetched" );
    return ( "welcome!");
  } catch ( err ) {
    console.log( err );
    next( err );
  }
});

router.get( "/bottle", async ( req, res, next ) => {
  try {
    const bottle = await Bottle.find();
    console.log( "succesfully found bottles list", bottle );
    return res.send( bottle );
  } catch ( err ) {
    console.log( err );
    next( err );
  }
});

// router.get( "/newMovies", async ( req, res, next ) => {
//   axios.get( "https://api.themoviedb.org/3/movie/upcoming?api_key=8b01318939795027b44c93d6cfb76940&language=en-US&page=1" )
//     .then( response => {
//       const newMovies = response.data.results;
//       console.log( "new movies succesfully fetched" );
//       return res.json( newMovies );
//     })
//     .catch( error => {
//       console.log( error );
//     })
// });

module.exports = router;
