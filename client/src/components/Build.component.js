import React, {useState, useEffect} from 'react';
import '../App.css';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Tile from 'react-bulma-components/lib/components/tile';
import MascaraBuild from './MascaraBuild.component';
import {
  BottleModal,
  BrushModal,
  RodModal,
} from './OpenModal.component';
import {
  ThreadCompatibility,
  BrushRodCompatibility,
  BrushWiperCompatibility,
  GapCompatibility,
} from './Compatibility.component';
import axios from "axios";

const Build = () => {

  //------hooks
  const [thread, setThread] = useState(false);
  const [rodBrush, setRodBrush] = useState(false);
  const [brushWiper, setBrushWiper] = useState(false);
  const [gap, setGap] = useState(false);
  const [build, setBuild] = useState([]);
  const [bottle, setBottle] = useState([]);
  const [rod, setRod] = useState([]);
  const [brush, setBrush] = useState([]);
  const [modalClick, setModalClick] = useState(false);
  //------hooks end

  //-----------------------------------------------------------useEffect
  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();

    if (!build[0]) {
      setThread(false);
      setGap(false);
      setBrushWiper(false);
      setRodBrush(false);
    }

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalClick]);
  //-----------------------------------------------------------useEffect end

  //------middlewares that must be moved and imported
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
  //------middlewares that must be moved and imported end

  //------rendering of the component
  return (
    <div className="App App-build">
      <Tile kind="ancestor">
        <Tile kind="parent">
          <Tile renderAs="article" kind="child" notification >
            <ThreadCompatibility thread={thread}>
            </ThreadCompatibility>
          </Tile>
          <Tile renderAs="article" kind="child" notification >
            <BrushRodCompatibility rodBrush={rodBrush}>
            </BrushRodCompatibility>
          </Tile>
          <Tile renderAs="article" kind="child" notification >
            <BrushWiperCompatibility brushWiper={brushWiper}>
            </BrushWiperCompatibility>
          </Tile>
          <Tile renderAs="article" kind="child" notification >
            <GapCompatibility gap={gap}>
            </GapCompatibility>
          </Tile>
        </Tile>
      </Tile>

      {/* verifying assembly tiles*/}
      {/* mascara*/}

      <MascaraBuild>
      </MascaraBuild>

      {/* mascara*/}
      {/* Modal buttons*/}

      <Button.Group
        position="centered"
        size="medium"
        onClick={() => setModalClick(!modalClick)}
      >
        <BottleModal rod={rod}>
        </BottleModal>
        <BrushModal rod={rod} bottle={bottle}>
        </BrushModal>
        <RodModal bottle={bottle}>
        </RodModal>
        <Button
          color="danger"
          onClick={() => {
            deleteBuild();
          }}
        >
          Erase build
        </Button>
      </Button.Group>

      {/* Modal buttons*/}
      {/* Delete and reset*/}
      {/* check buttons - will be invisibilised*/}

      <Section>
        <Container>
          <Button.Group
            position="centered"
            size="medium"
            onClick={() => setModalClick(!modalClick)}
          >

            <Button
              color="info"
              onClick={() => {
                reset();
              }}
            >
              Reset
            </Button>
            <Button
              color="info"
              onClick={() => {
                setRodBrush(true);
                setThread(true);
                setBrushWiper(true);
                setGap(true);
              }}
            >
              Check state
            </Button>
          </Button.Group>

    {/* Check buttons - will be invisibilised*/}
    {/* Buttons to checkthe assembly*/}

          <Button.Group
            position="centered"
            size="medium"
            className="invisible"
          >
            <Button
              color="dark"
              onClick={() => {
                verifyThread();
              }}
            >
              Check thread
            </Button>
            <Button
              color="dark"
              onClick={() => {
                verifyRodBrush();
              }}
            >
              Check rod and brush
            </Button>
            <Button
              color="dark"
              onClick={() => {
                verifyBrushWiper();
              }}
            >
              Check brush and wiper
            </Button>
            <Button
              color="dark"
              onClick={() => {
                verifyGap();
              }}
            >
              Check gap
            </Button>
          </Button.Group>

      {/* Buttons to check the assembly*/}
        </Container>
      </Section>
    </div>
  );
}

//------here ends rendering of the component

export default Build;
