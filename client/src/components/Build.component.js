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

const Build = ( ) => {
  const [thread, setThread] = useState(false);
  const [buildData, setBuildData] = useState({});

  // useEffect( () => {
  //   fetch("/build")
  //     .then((response) => response.json())
  //     .then(buildList => {
  //         setBuildData(buildList);
  //     });
  //     if (buildData) {
  //       const bottleThread = buildData.bottle.thread;
  //       const rodThread = buildData.rod.thread;
  //       if ( buildData.bottle && builData.rod ) {
  //         setThread(true);
  //       }
  //     } else {
  //       setThread(false);
  //     }
  // }, []);

  const { isLoading, error, data } = useQuery("build", getBuild);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }

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

  return (
    <div className="App">
      <Compatibility thread={thread}>
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
          <Button
            color="info"
            onClick={() => {
              deleteBuild();
            }}
          >
            Erase build
          </Button>
          <Button
            color="info"
            onClick={() => {
              setThread(!thread);
            }}
          >
            thread
          </Button>
          <p>
            <Heading size={5} renderAs="p">Build</Heading>
            <Heading subtitle renderAs="p">Mascara</Heading>
          </p>
          <Button.Group
            hasAddons={boolean('hasAddons', false)}
            position="centered"
            size={select('Size', { small: 'small', medium: 'medium', large: 'large' })}
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
