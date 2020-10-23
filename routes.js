const express = require( "express" );
const router = express.Router();
const Bottle = require( "./models/bottle.model" );
// const axios = require( "axios" );

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

router.get( "/brush", async ( req, res, next ) => {
  try {
    const brush = await Brush.find();
    console.log( "succesfully found brushes list" );
    return res.send( bottle );
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
