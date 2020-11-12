import React, {useState, useEffect} from 'react';
import '../App.css';
import { select, boolean } from '@storybook/addon-knobs';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import { useQuery } from "react-query";
import {
  BottleModal,
  BrushModal,
  RodModal,
  CapModal,
  WiperModal
} from './OpenModal.component';
import {
  Compatibility
} from './Compatibility.component';
import { getBuild } from "../middlewares/services";
import axios from "axios";

const Build = () => {
  const [thread, setThread] = useState(false);
  const [rodBrush, setRodBrush] = useState(false);
  const [brushWiper, setBrushWiper] = useState(false);
  const [gap, setGap] = useState(false);
  const [build, setBuild] = useState([]);
  const { isLoading, error, data } = useQuery("build", getBuild);

  if (isLoading) return "Loading...";
  if (error) return "Oops! ";

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
    if (data[0] && data[0].bottle && data[0].rod) {
      if (data[0].bottle.thread === data[0].rod.thread) {
        setThread(true);
      } else {
        setThread(false);
      }
    }
  };
  const verifyRodBrush = () => {
    if (data[0] && data[0].brush && data[0].rod) {
      if (data[0].brush.type === "INYECTADO") {
        let brushRodDiff =  Number(data[0].rod.dimensions.brushDiameter) - Number(data[0].brush.shaftDiameter);
        if ( brushRodDiff > 0.05 && brushRodDiff < 0.15){
          setRodBrush(true);
        } else {
          alert("Cannot calculate")
        }
      }
      if (data[0].brush.type === "NYLON") {
        let brushRodDiff = Number(data[0].brush.shaftDiameter) - Number(data[0].rod.dimensions.rodDiameter);
        (brushRodDiff > -0.05 && brushRodDiff < 0.1 ? setRodBrush(true) : setRodBrush(false))
      }
      if (data[0].brush.type === "LIP GLOSS") {
        let brushRodDiff = Number(data[0].brush.shaftDiameter) - Number(data[0].rod.dimensions.rodDiameter);
        (brushRodDiff > 0 && brushRodDiff < 0.2 ? setRodBrush(true) : setRodBrush(false))
      }
      if (data[0].brush.type === "DELINEADOR") {
        let brushRodDiff = Number(data[0].brush.shaftDiameter) - Number(data[0].rod.dimensions.rodDiameter);
        (brushRodDiff > -0.05 && brushRodDiff < 0.1 ? setRodBrush(true) : setRodBrush(false))
      }
    }
  };
  const verifyBrushWiper = () => {
    if (data[0] && data[0].bottle && data[0].rod) {
      if (data[0].bottle.thread === data[0].rod.thread) {
        setBrushWiper(true);
      } else {
        setBrushWiper(false);
      }
    }
  };
  const verifyGap = () => {
    if (data[0] && data[0].bottle && data[0].rod) {
      if (data[0].bottle.thread === data[0].rod.thread) {
        setGap(true);
      } else {
        setGap(false);
      }
    }
  };
  const reset = () => {
    setThread(false);
    setGap(false);
    setBrushWiper(false);
    setRodBrush(false);
  };

  return (
    <div className="App App-header">
      <Compatibility thread={thread}>
      </Compatibility>
      <Compatibility rodBrush={rodBrush}>
      </Compatibility>
      <Section>
        { data.map( element =>
          <div>
            {element.bottle ?
              <div>
                <li key = { element.bottle.name }>{ element.bottle.name }</li>
                <li key = { element.bottle.thread }>{ element.bottle.thread } </li>
              </div>
              : "" }
            {element.brush ?
              <div>
                <li key = { element.brush.brush }>{ element.brush.brush }</li>
                <li key = { element.brush.type }>{ element.brush.type }</li>
              </div>
              : "" }
            {element.rod ?
              <div>
                <li key = { element.rod.name }>{ element.rod.name }</li>
                <li key = { element.rod.thread }>{ element.rod.thread }</li>
              </div>
              : "" }
          </div>
        )}
      </Section>
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
              color="light"
              onClick={() => {
                verifyThread();
              }}
            >
              Check thread
            </Button>
            <Button
              color="light"
              onClick={() => {
                verifyRodBrush();
              }}
            >
              Check rod and brush
            </Button>
            <Button
              color="light"
              onClick={() => {
                verifyBrushWiper();
              }}
            >
              Check brush and wiper
            </Button>
            <Button
              color="light"
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
    </div>
  );
}

export default Build;
