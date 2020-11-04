const express = require("express");
const router = express.Router();
const Bottle = require("./models/bottle.model").Bottle;
const Brush = require("./models/brush.model").Brush;
const Cap = require("./models/cap.model");
const Rod = require("./models/rod.model").Rod;
const Wiper = require("./models/wiper.model");
const Build = require("./models/build.model");

router.get("/", async (req, res, next) => {
  try {
    console.log("succesfully fetched index");
    return "welcome!";
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/bottle", async (req, res, next) => {
  try {
    const bottle = await Bottle.find();
    console.log("succesfully found bottles list");
    return res.send(bottle);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/bottle", async (req, res, next) => {
  const data = {
    name: "mascara",
    "bottle.name": req.body.name,
    "bottle.drawing": req.body.drawing,
    "bottle.mold": req.body.mold,
    "bottle.depth": req.body.depth,
    "bottle.thread": req.body.thread,
  };

  try {
    const already_bottle = await Build.findOne({
      name: "mascara",
    });
    if (already_bottle === null) {
      const build = new Build(data);
      await build.save();
      console.log("Bottle added to build!");
      res.status(200).send("Bottle added to your build list!");
    } else if (already_bottle)  {
      const build = await Build.updateOne(
        { name: "mascara" },
        { "bottle.name": req.body.name }
      );
      console.log("Bottle updated to build!");
      res.status(200).send("Bottle updated in build list!");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
    return;
  }

});

router.get("/build", async (req, res, next) => {
  try {
    const build = await Build.find();
    console.log("succesfully found build list");
    return res.send(build);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/brush", async (req, res, next) => {
  try {
    const brush = await Brush.find();
    console.log("succesfully found brushes list");
    return res.send(brush);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/brush", async (req, res, next) => {
  const data = {
    name: "mascara",
    "brush.brush": req.body.brush,
    "brush.original": req.body.original,
    "brush.shaftLength": req.body.shaftLength,
    "brush.shaftDiameter": req.body.shaftDiameter,
    "brush.brushLength": req.body.brushLength,
    "brush.brushDiameter": req.body.brushDiameter
  };

  try {
    const already_brush = await Build.findOne({
      name: "mascara",
    });
    if (already_brush === null) {
      const build = new Build(data);
      await build.save();
      console.log("brush added to build!");
      res.status(200).send("brush added to your build list!");
    } else if (already_brush)  {
      const build = await Build.updateOne(
        { name: "mascara" },
        { "brush.brush": req.body.brush }
      );
      console.log("Brush updated to build!");
      res.status(200).send("brush updated in build list!");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
    return;
  }

});

router.get("/cap", async (req, res, next) => {
  try {
    const cap = await Cap.find();
    console.log("succesfully found caps list");
    return res.send(cap);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/rod", async (req, res, next) => {
  try {
    const rod = await Rod.find();
    console.log("succesfully found rods list");
    return res.send(rod);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/rod", async (req, res, next) => {
  const data = {
    name: "mascara",
    "rod.name": req.body.name,
    "rod.drawing": req.body.drawing,
    "rod.thread": req.body.thread,
    "rod.dimensions.length": req.body.dimensions.length,
    "rod.dimensions.rodDiameter": req.body.dimensions.rodDiameter,
    "rod.dimensions.brushDiameter": req.body.dimensions.brushDiameter
  };

  try {
    const already_rod = await Build.findOne({
      name: "mascara",
    });
    if (already_rod === null) {
      const build = new Build(data);
      await build.save();
      console.log("Rod added to build!");
      res.status(200).send("Rod added to your build list!");
    } else if (already_rod)  {
      const build = await Build.updateOne(
        { name: "mascara" },
        { "rod.name": req.body.name }
      );
      console.log("Rod updated to build!");
      res.status(200).send("Rod updated in build list!");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
    return;
  }

});

router.get("/wiper", async (req, res, next) => {
  try {
    const wiper = await Wiper.find();
    console.log("succesfully found wipers list");
    return res.send(wiper);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/delete", async(req, res, next)=>{
	try{
		await Build.deleteMany({});
    console.log("Succesfully deleted");
		res.json('Build deleted')
	}catch(err){
		res.status(400).json(err)
	}
})

module.exports = router;
