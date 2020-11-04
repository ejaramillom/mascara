import React from 'react';
import '../App.css';
import { select, boolean } from '@storybook/addon-knobs';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import { useQuery } from "react-query";
import {
  OpenModal,
  BottleModal,
  BrushModal,
  RodModal,
  CapModal,
  WiperModal
} from './OpenModal.component';
import { getBuild } from "../middlewares/services";
import axios from "axios";

const positions = {
  default: '',
  centered: 'centered',
  right: 'right'
};

const Build = ( ) => {

  const { isLoading, error, data } = useQuery("build", getBuild);
  console.log(data);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }

  const deleteBuild = async () => {
    const ServerCall = await axios
      .post("/delete")
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
    <div className="App App-header">
      <Section>
          { data.map( element =>
            <div>
              {element.bottle ? <li key = { element.bottle.name }>{ element.bottle.name }</li> : "" }
              {element.brush ? <li key = { element.brush.brush }>{ element.brush.brush }</li> : "" }
              {element.rod ? <li key = { element.rod.name }>{ element.rod.name }</li> : "" }
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
          <p className="bd-notification is-info">
            <Heading size={5} renderAs="p">Build</Heading>
            <Heading subtitle renderAs="p">Mascara</Heading>
          </p>
        </Container>
        <Button.Group
          hasAddons={boolean('hasAddons', false)}
          position={select('Position', positions)}
          size={select('Size', { small: 'small', medium: 'medium', large: 'large' })}
        >
          <BottleModal>
          </BottleModal>
          <BrushModal>
          </BrushModal>
          <RodModal>
          </RodModal>
        </Button.Group>
      </Section>
    </div>
  );
}

export default Build;
