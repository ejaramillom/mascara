const express = require( "express" );
const router = express.Router();
const Bottle = require( "./models/bottle.model" );
const Brush = require( "./models/brush.model" );
const Cap = require( "./models/cap.model" );
const Rod = require( "./models/rod.model" );
const Wiper = require( "./models/wiper.model" );
const Build = require( "./models/build.model" );

router.get( "/", async ( req, res, next ) => {
  try {
    console.log( "succesfully fetched index" );
    return ( "welcome!");
  } catch ( err ) {
    console.log( err );
    next( err );
  }
});

router.get( "/bottle", async ( req, res, next ) => {
  try {
    const bottle = await Bottle.find();
    console.log( "succesfully found bottles list" );
    return res.send( bottle );
  } catch ( err ) {
    console.log( err );
    next( err );
  }
});

router.post( "/bottle", async ( req, res, next ) => {

  const data = {
		bottleName: req.body.bottleName,
  }

	try {
		const already_bottle = await Build.findOne({ bottleName: req.body.bottleName })
		if( already_bottle === null ) {
			const bottle = new Build( data );
			await bottle.save();
      res.status( 200 ).send( "Bottle added to your build list!" );
      console.log( "Bottle added to build!" );
		} else {
      res.status( 400 ).send( "Bottle already in build list!" );
		}
	} catch ( err ){
    console.log( err );
		res.status( 400 ).json( err );
	}

});

router.get( "/brush", async ( req, res, next ) => {
  try {
    const brush = await Brush.find();
    console.log( "succesfully found brushes list" );
    return res.send( brush );
  } catch ( err ) {
    console.log( err );
    next( err );
  }
});

router.get( "/cap", async ( req, res, next ) => {
  try {
    const cap = await Cap.find();
    console.log( "succesfully found caps list" );
    return res.send( cap );
  } catch ( err ) {
    console.log( err );
    next( err );
  }
});

router.get( "/rod", async ( req, res, next ) => {
  try {
    const rod = await Rod.find();
    console.log( "succesfully found rods list" );
    return res.send( rod );
  } catch ( err ) {
    console.log( err );
    next( err );
  }
});

router.get( "/wiper", async ( req, res, next ) => {
  try {
    const wiper = await Wiper.find();
    console.log( "succesfully found wipers list" );
    return res.send( wiper );
  } catch ( err ) {
    console.log( err );
    next( err );
  }
});

module.exports = router;
