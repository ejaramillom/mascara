import React, {useState, useEffect} from 'react';
import Button from 'react-bulma-components/lib/components/button';
import Tile from 'react-bulma-components/lib/components/tile';
import Heading from 'react-bulma-components/lib/components/heading';
import axios from "axios";

//---------------- Bottle filter

export const BottleFilter = (props) => {
  const bottles = props.bottles;
  const rod = props.rod;
  const bottle = props.bottle;
  const setBuildClick = props.setBuildClick;
  const buildClick = props.buildClick;


  const addBottle = async (data) => {
    await axios.post("/bottle", {
      name: data.name,
      drawing: data.drawing,
      mold: data.mold,
      depth: data.depth,
      thread: data.thread
    })
    .then(function (response) {
      if (response.status === 200) {
        alert("Bottle added to the list!");
        console.log("Succesfully added");
      } else {
        const err = new Error(response.error);
        console.log(err);
        throw err;
      }
    })
    .catch(function (error) {
      alert(error);
    });
  };

  const addBottleClick = (element) => {
    addBottle(element);
    setBuildClick(!buildClick);
  };

  if (rod && rod.thread){
    const filteredBottles = bottles.filter( element => {
      return element.thread.toLowerCase().indexOf(rod.thread.toLowerCase()) !== -1;
    });

    return (
      <div>
        {filteredBottles.map((element) => (
          <Tile kind="ancestor">
            <Tile kind="parent">
              <Tile renderAs="article" kind="child" notification color="light">
                <Heading size={6} renderAs="p">{element.name}</Heading>
                <Heading size={7} subtitle renderAs="p">{element.drawing}</Heading>
                <Heading size={7} subtitle renderAs="p">{element.mold}</Heading>
                <Button
                  type="submit"
                  color="success"
                  onClick={() => {
                    addBottle(element);
                  }}
                >
                  Add Bottle
                </Button>
              </Tile>
            </Tile>
          </Tile>
        ))}
      </div>
    );
  } else if (bottle && bottle.name){
    const filteredBottles = bottles.filter( element => {
      return element.name.toLowerCase().indexOf(bottle.name.toLowerCase()) !== -1;
    });

    return (
      <div>
        {filteredBottles.map((element) => (
          <Tile kind="ancestor">
            <Tile kind="parent">
              <Tile renderAs="article" kind="child" notification color="light">
                <Heading size={6} renderAs="p">{element.name}</Heading>
                <Heading size={7} subtitle renderAs="p">{element.drawing}</Heading>
                <Heading size={7} subtitle renderAs="p">{element.mold}</Heading>
                <Button
                  type="submit"
                  color="success"
                  onClick={() => {
                    addBottleClick(element);
                  }}
                >
                  Add Bottle
                </Button>
              </Tile>
            </Tile>
          </Tile>
        ))}
      </div>
    );
  }

  return (
    <div>
      {bottles.map((element) => (
        <Tile kind="ancestor">
          <Tile kind="parent">
            <Tile renderAs="article" kind="child" notification color="light">
              <Heading size={6} renderAs="p">{element.name}</Heading>
              <Heading size={7} subtitle renderAs="p">{element.drawing}</Heading>
              <Heading size={7} subtitle renderAs="p">{element.mold}</Heading>
              <Button
                type="submit"
                color="success"
                onClick={() => {
                  addBottleClick(element);
                }}
              >
                Add Bottle
              </Button>
            </Tile>
          </Tile>
        </Tile>
      ))}
    </div>
  );
};

//---------------- Bottle filter

//---------------- Brush filter

export const BrushFilter = (props) => {
  const [brushes, setBrushes] = useState([]);
  const rod = props.rod;
  const bottle = props.bottle;

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get("/brush")
      .catch(function (error) {
        console.log(error)
      });
      setBrushes(data);
    }
    fetchData();
  }, []);

  const addBrush = async (data) => {
    await axios.post("/brush", {
        brush: data.brush,
        original: data.original,
        shaftLength: data.shaftLength,
        shaftDiameter: data.shaftDiameter,
        brushLength: data.brushLength,
        brushDiameter: data.brushDiameter,
        type: data.type
      })
      .then(function (response) {
        if (response.status === 200) {
          alert("Brush added to the list!");
          console.log("Succesfully added");
        } else {
          const err = new Error(response.error);
          console.log(err);
          throw err;
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  if (rod && rod.name && bottle && bottle.name){
    const filteredBrushes = brushes.filter( element => {
      let mascaraGap =  (Number(bottle.depth) - (Number(element.brushLength) + Number(rod.dimensions.length)));
      if (mascaraGap > 1 && mascaraGap < 6) {
        return element;
      } else {
        return null ;
      }
      // .shaftDiameter.toLowerCase().indexOf(rod.dimensions.brushDiameter.toLowerCase()) !== -1
    });

  return (
    <div>
      {filteredBrushes.map((element) => (
        <Tile kind="ancestor">
          <Tile kind="parent">
            <Tile renderAs="article" kind="child" notification color="light">
              <Heading size={6} renderAs="p">{element.name}</Heading>
              <Heading size={7} subtitle renderAs="p">{element.drawing}</Heading>
              <Heading size={7} subtitle renderAs="p">{element.mold}</Heading>
              <Button
                type="submit"
                color="success"
                onClick={() => {
                  addBrush(element);
                }}
              >
                Add Brush
              </Button>
            </Tile>
          </Tile>
        </Tile>
      ))}
    </div>
  );
}

  return (
    <div>
      {brushes.map((element) => (
        <Tile kind="ancestor">
          <Tile kind="parent">
            <Tile renderAs="article" kind="child" notification color="light">
              <Heading size={6} renderAs="p">{element.brush}</Heading>
              <Heading size={7} subtitle renderAs="p">{element.drawing}</Heading>
              <Heading size={7} subtitle renderAs="p">{element.type}</Heading>
              <Button
                type="submit"
                color="success"
                onClick={() => {
                  addBrush(element);
                }}
              >
                Add Brush
              </Button>
            </Tile>
          </Tile>
        </Tile>
      ))}
    </div>
  );
};

//---------------- Brush filter

//---------------- Rod filter

export const RodFilter = (props) => {
  const [rods, setRods] = useState([]);
  const bottle = props.bottle;

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get("/rod")
      .catch(function (error) {
        console.log(error)
      });
      setRods(data);
    }
    fetchData();
  }, []);

  const addRod = async (data) => {
    await axios.post("/rod", {
        name: data.name,
        drawing: data.drawing,
        thread: data.thread,
        dimensions: {
          length: data.dimensions.length,
          rodDiameter: data.dimensions.rodDiameter,
          brushDiameter: data.dimensions.brushDiameter,
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          alert("Rod added to the list!");
          console.log("Succesfully added");
        } else {
          const err = new Error(response.error);
          console.log(err);
          throw err;
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  if (bottle && bottle.thread){
    const filteredRods = rods.filter( element => {
      if (element.thread) {
        return element.thread.toLowerCase().indexOf(bottle.thread.toLowerCase()) !== -1;
      } else {
        return element;
      }
    });

  return (
    <div>
      {filteredRods.map((element) => (
        <Tile kind="ancestor">
          <Tile kind="parent">
            <Tile renderAs="article" kind="child" notification color="light">
              <Heading size={6} renderAs="p">{element.name}</Heading>
              <Heading size={7} subtitle renderAs="p">{element.drawing}</Heading>
              <Heading size={7} subtitle renderAs="p">{element.mold}</Heading>
              <Button
                type="submit"
                color="success"
                onClick={() => {
                  addRod(element);
                }}
              >
                Add Rod
              </Button>
            </Tile>
          </Tile>
        </Tile>
      ))}
    </div>
  );
}

  return (
    <div>
      {rods.map((element) => (
        <Tile kind="ancestor">
          <Tile kind="parent">
            <Tile renderAs="article" kind="child" notification color="light">
              <Heading size={6} renderAs="p">{element.name}</Heading>
              <Heading size={7} subtitle renderAs="p">{element.drawing}</Heading>
              <Heading size={7} subtitle renderAs="p">{element.mold}</Heading>
              <Button
                type="submit"
                color="success"
                onClick={() => {
                  addRod(element);
                }}
              >
                Add Rod
              </Button>
            </Tile>
          </Tile>
        </Tile>
      ))}
    </div>
  );
};

//---------------- Rod filter

//---------------- Wiper filter

export const WiperFilter = (props) => {
  const [wipers, setWipers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get("/wiper")
      .catch(function (error) {
        console.log(error)
      });
      setWipers(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {wipers.map((element) => (
        <Tile kind="ancestor">
          <Tile kind="parent">
            <Tile renderAs="article" kind="child" notification color="light">
              <Heading size={6} renderAs="p">{element.name}</Heading>
              <Heading size={7} subtitle renderAs="p">{element.drawing}</Heading>
              <Heading size={7} subtitle renderAs="p">{element.mold}</Heading>
              <Button
                type="submit"
                color="success"

              >
                Add Wiper
              </Button>
            </Tile>
          </Tile>
        </Tile>
      ))}
    </div>
  );
};

//---------------- Wiper filter

//---------------- Filter component

const Filter = () => {

//---------------- hooks

  const [thread, setThread] = useState(false);
  const [rodBrush, setRodBrush] = useState(false);
  const [brushWiper, setBrushWiper] = useState(false);
  const [gap, setGap] = useState(false);
  const [build, setBuild] = useState([]);
  const [bottles, setBottles] = useState([]);
  const [bottle, setBottle] = useState([]);
  const [rod, setRod] = useState([]);
  const [brush, setBrush] = useState([]);
  const [buildClick, setBuildClick] = useState(false);

//---------------- hooks end

//---------------- useEffect

  useEffect(() => {
    const fetchBuild = async () => {
      const {data} = await axios.get("/build")
      .catch(function (error) {
        console.log(error)
      });
      setBuild(data);
      if (data[0] && data[0].bottle) {
        setBottle(data[0].bottle);
      } else {
        setBottle([])
      }
      if (data[0] && data[0].rod) {
        setRod(data[0].rod);
      } else {
        setRod([])
      }
      if (data[0] && data[0].brush) {
        setBrush(data[0].brush);
      } else {
        setBrush([])
      }
    }

    const fetchBottles = async () => {
      const {data} = await axios.get("/bottle")
      .catch(function (error) {
        console.log(error)
      });
      setBottles(data);
    }

    fetchBuild();
    fetchBottles();

    if (!build[0]) {
      setThread(false);
      setGap(false);
      setBrushWiper(false);
      setRodBrush(false);
    }

    //---------------- Use effect

    //------thread check
    if (build[0] && bottle && rod) {
      if (bottle.thread === rod.thread) {
        setThread(true);
      }
    } else {
      setThread(false);
    }
    //------thread check

    //------rod and brush check
    if (build[0] && brush.type && rod.name) {
      let brushRodDiff =  Number(rod.dimensions.brushDiameter) - Number(brush.shaftDiameter);
      if (brush.type === "INYECTADO") {
        if (brushRodDiff > 0.05 && brushRodDiff < 0.15){
          setRodBrush(true);
        } else {
          setRodBrush(false);
        }
      }
      if (brush.type === "NYLON") {
        if (brushRodDiff > -0.05 && brushRodDiff < 0.1){
          setRodBrush(true);
        } else {
          setRodBrush(false);
        }
      }
      if (brush.type === "LIP GLOSS") {
        if (brushRodDiff > 0 && brushRodDiff < 0.2){
          setRodBrush(true);
        } else {
          setRodBrush(false);
        }
      }
      if (brush.type === "DELINEADOR") {
        if (brushRodDiff > -0.05 && brushRodDiff < 0.1){
          setRodBrush(true);
        } else {
          setRodBrush(false);
        }
      }
    }
    //------rod and brush check

    //------wiper and brush check
    if (build[0] && brush.type && rod.name) {
      let brushWiperDiff =  Number(brush.brushDiameter) - Number(rod.dimensions.rodDiameter) ;
      if (brush.type === "INYECTADO") {
        if (brushWiperDiff > 0.5 && brushWiperDiff < 4.8){
          setBrushWiper(true);
        } else {
          setBrushWiper(false);
        }
      }
      if (brush.type === "NYLON") {
        if (brushWiperDiff > 0.8 && brushWiperDiff < 6.4){
          setBrushWiper(true);
        } else {
          setBrushWiper(false);
        }
      }
      if (brush.type === "LIP GLOSS") {
        if (brushWiperDiff > -3 && brushWiperDiff < 2){
          setBrushWiper(true);
        } else {
          setBrushWiper(false);
        }
      }
      if (brush.type === "DELINEADOR") {
        if (brushWiperDiff > 1 && brushWiperDiff < 2){
          setBrushWiper(true);
        } else {
          setBrushWiper(false);
        }
      }
    }
    //------wiper and brush check

    //------gap check
    if (build[0] && brush.type && rod.name && bottle.name) {
      let mascaraGap =  Number(bottle.depth) - (Number(brush.brushLength) + Number(rod.dimensions.length));
      if (brush.type === "INYECTADO") {
        if (mascaraGap > 2 && mascaraGap < 6){
          setGap(true);
        } else {
          setGap(false);
        }
      }
      if (brush.type === "NYLON") {
        if (mascaraGap > 1 && mascaraGap < 5){
          setGap(true);
        } else {
          setGap(false);
        }
      }
      if (brush.type === "LIP GLOSS") {
        if (mascaraGap > 1 && mascaraGap < 6){
          setGap(true);
        } else {
          setGap(false);
        }
      }
      if (brush.type === "DELINEADOR") {
        if (mascaraGap > 1 && mascaraGap < 5){
          setGap(true);
        } else {
          setGap(false);
        }
      }
    }
    //------gap check

}, [buildClick]);

//---------------- useEffect

//---------------- middlewares that must be moved and imported

  const deleteBuild = async () => {
    await axios.post("/delete")
    .then(function (response) {
      if (response.status === 200) {
        console.log("Succesfully deleted");
        setThread(false);
        setGap(false);
        setBrushWiper(false);
        setRodBrush(false);
        alert("Build deleted!");
      } else {
        const err = new Error(response.error);
        console.log(err);
        throw err;
      }
    })
    .catch(function (error) {
      alert(error);
    });
  };

  const verifyThread = () => {
    if (build[0] && bottle.name && rod.name) {
      if (bottle.thread === rod.thread) {
        setThread(true);
      } else {
        alert("Threads are different")
        setThread(false);
      }
    } else {
      alert("There is missing data on the mascara")
    }
  };

  const verifyRodBrush = () => {
    if (build[0] && brush.type && rod.name) {
      let brushRodDiff =  Number(rod.dimensions.brushDiameter) - Number(brush.shaftDiameter);
      if (brush.type === "INYECTADO") {
        if (brushRodDiff > 0.05 && brushRodDiff < 0.15){
          setRodBrush(true);
        } else {
          alert("Difference is lower than 0.05mm or bigger than 0.15mm")
        }
      }
      if (brush.type === "NYLON") {
        if (brushRodDiff > -0.05 && brushRodDiff < 0.1){
          setRodBrush(true);
        } else {
          alert("Difference is lower than -0.05mm or bigger than 0.1mm")
        }
      }
      if (brush.type === "LIP GLOSS") {
        if (brushRodDiff > 0 && brushRodDiff < 0.2){
          setRodBrush(true);
        } else {
          alert("Difference is lower than 0mm or bigger than 0.2mm")
        }
      }
      if (brush.type === "DELINEADOR") {
        if (brushRodDiff > -0.05 && brushRodDiff < 0.1){
          setRodBrush(true);
        } else {
          alert("Difference is lower than -0.05mm or bigger than 0.1mm")
        }
      }
    } else {
      alert("There is missing data on the mascara")
    }
  };

  const verifyBrushWiper = () => {
    if (build[0] && brush.type && rod.name) {
      let brushWiperDiff =  Number(brush.brushDiameter) - Number(rod.dimensions.rodDiameter) ;
      if (brush.type === "INYECTADO") {
        if (brushWiperDiff > 0.5 && brushWiperDiff < 4.8){
          setBrushWiper(true);
        } else {
          alert("Difference is lower than 0.5mm or bigger than 4.8mm")
        }
      }
      if (brush.type === "NYLON") {
        if (brushWiperDiff > 0.8 && brushWiperDiff < 6.4){
          setBrushWiper(true);
        } else {
          alert("Difference is lower than 0.8mm or bigger than 6.4mm")
        }
      }
      if (brush.type === "LIP GLOSS") {
        if (brushWiperDiff > -3 && brushWiperDiff < 2){
          setBrushWiper(true);
        } else {
          alert("Difference is lower than -3mm or bigger than 2mm")
        }
      }
      if (brush.type === "DELINEADOR") {
        if (brushWiperDiff > 1 && brushWiperDiff < 2){
          setBrushWiper(true);
        } else {
          alert("Difference is lower than 1mm or bigger than 2mm")
        }
      }
    } else {
      alert("There is missing build on the mascara")
    }
  };

  const verifyGap = () => {
    if (build[0] && bottle.name && rod.name) {
      if (bottle.thread === rod.thread) {
        setGap(true);
      } else {
        setGap(false);
      }
    } else {
      alert("There is missing data on the mascara")
    }
  };

  const reset = () => {
    setThread(false);
    setGap(false);
    setBrushWiper(false);
    setRodBrush(false);
  };

  const removeBottleClick = () => {
    deleteBuild([]);
    setBuildClick(!buildClick);
  };

  // const addBottleClick = (element) => {
  //   addBottle(element);
  //   setBuildClick(!buildClick);
  // };

//---------------- middlewares that must be moved and imported end

//---------------- render
  return (
    <div>
      <Tile kind="ancestor">
        <Tile kind="parent">
          <Tile renderAs="article" kind="child" notification color="gray">
            <Button
              color="danger"
              onClick={() => {
                removeBottleClick();
              }}
            >
              delete build
            </Button>
            <BottleFilter thread={thread} rod={rod} bottle={bottle} bottles={bottles} setBuildClick={setBuildClick} buildClick={buildClick}></BottleFilter>
          </Tile>
          <Tile renderAs="article" kind="child" notification >
            <BrushFilter></BrushFilter>
          </Tile>
          <Tile renderAs="article" kind="child" notification >
            <RodFilter></RodFilter>
          </Tile>
          <Tile renderAs="article" kind="child" notification >
            <WiperFilter></WiperFilter>
          </Tile>
        </Tile>
      </Tile>

      {/* verifying assembly tiles*/}

      {/* Delete and reset*/}
    </div>
  );
}

//--------------- render

export default Filter;

//---------------- Filter component
