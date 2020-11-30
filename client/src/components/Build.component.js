import React, {useState, useEffect} from 'react';
import '../App.css';
import { select, boolean } from '@storybook/addon-knobs';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Tile from 'react-bulma-components/lib/components/tile';
import { useQuery } from "react-query";
import {
  BottleModal,
  BrushModal,
  RodModal,
  CapModal,
  WiperModal
} from './OpenModal.component';
import MascaraBuild from './MascaraBuild.component';
import {
  ThreadCompatibility,
  BrushRodCompatibility,
  BrushWiperCompatibility,
  GapCompatibility,
} from './Compatibility.component';
import { getBuild } from "../middlewares/services";
import axios from "axios";

const Build = () => {
  const [thread, setThread] = useState(false);
  const [rodBrush, setRodBrush] = useState(false);
  const [brushWiper, setBrushWiper] = useState(false);
  const [gap, setGap] = useState(false);
  const [build, setBuild] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get("/build");
      console.log("Data retrieved")
      setBuild(data);
    }
    fetchData();
  }, [Build]);

  const deleteBuild = async () => {
    await axios.post("/delete")
    .then(function (response) {
      if (response.status === 200) {
        console.log("Succesfully deleted");
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
    if (build[0] && build[0].bottle && build[0].rod) {
      if (build[0].bottle.thread === build[0].rod.thread) {
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
    if (build[0] && build[0].brush && build[0].rod) {
      let brushRodDiff =  Number(build[0].rod.dimensions.brushDiameter) - Number(build[0].brush.shaftDiameter);
      if (build[0].brush.type === "INYECTADO") {
        if (brushRodDiff > 0.05 && brushRodDiff < 0.15){
          setRodBrush(true);
        } else {
          alert("Difference is lower than 0.05mm or bigger than 0.15mm")
        }
      }
      if (build[0].brush.type === "NYLON") {
        if (brushRodDiff > -0.05 && brushRodDiff < 0.1){
          setRodBrush(true);
        } else {
          alert("Difference is lower than -0.05mm or bigger than 0.1mm")
        }
      }
      if (build[0].brush.type === "LIP GLOSS") {
        if (brushRodDiff > 0 && brushRodDiff < 0.2){
          setRodBrush(true);
        } else {
          alert("Difference is lower than 0mm or bigger than 0.2mm")
        }
      }
      if (build[0].brush.type === "DELINEADOR") {
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
    if (build[0] && build[0].brush && build[0].rod) {
      let brushWiperDiff =  Number(build[0].brush.brushDiameter) - Number(build[0].rod.dimensions.rodDiameter) ;
      if (build[0].brush.type === "INYECTADO") {
        if (brushWiperDiff > 0.5 && brushWiperDiff < 4.8){
          setBrushWiper(true);
        } else {
          alert("Difference is lower than 0.5mm or bigger than 4.8mm")
        }
      }
      if (build[0].brush.type === "NYLON") {
        if (brushWiperDiff > 0.8 && brushWiperDiff < 6.4){
          setBrushWiper(true);
        } else {
          alert("Difference is lower than 0.8mm or bigger than 6.4mm")
        }
      }
      if (build[0].brush.type === "LIP GLOSS") {
        if (brushWiperDiff > -3 && brushWiperDiff < 2){
          setBrushWiper(true);
        } else {
          alert("Difference is lower than -3mm or bigger than 2mm")
        }
      }
      if (build[0].brush.type === "DELINEADOR") {
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
    if (build[0] && build[0].bottle && build[0].rod) {
      if (build[0].bottle.thread === build[0].rod.thread) {
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
      <Section>
        <Container>
          <Button.Group
            position="centered"
            size="medium"
          >
            <Button
              color="danger"
              onClick={() => {
                deleteBuild();
              }}
            >
              Erase build
            </Button>
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
              }}
            >
              Check state
            </Button>
          </Button.Group>
          <Button.Group
            position="centered"
            size="medium"
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
          <p>
            <Heading size={5} renderAs="p">Build</Heading>
            <Heading subtitle renderAs="p">Mascara</Heading>
          </p>
          <Button.Group
            position="centered"
            size="medium"
          >
            <BottleModal>
            </BottleModal>
            <BrushModal>
            </BrushModal>
            <RodModal>
            </RodModal>
          </Button.Group>
        </Container>
      </Section>
      <Section>
        <MascaraBuild>
        </MascaraBuild>
      </Section>
    </div>
  );
}

export default Build;
