import React from 'react';
import '../App.css';
import { select, boolean } from '@storybook/addon-knobs';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import { BottleModal, BrushModal, RodModal, CapModal, WiperModal } from './BuildModal.component';
import OpenModal from './OpenModal.component';
import { getBrushes, getBottles, getRods, getWipers, getCaps } from "../middlewares/services";

const positions = {
  default: '',
  centered: 'centered',
  right: 'right'
};

const Build = ( ) => {
  return (
    <div className="App App-header">
      <Section>
        <Container>
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
          <OpenModal modal={{ closeOnBlur: true }} name="Bottle">
            <BottleModal>
            </BottleModal>
          </OpenModal>
          <OpenModal modal={{ closeOnBlur: true }} name="Brush">
            <BrushModal>
            </BrushModal>
          </OpenModal>
          <OpenModal modal={{ closeOnBlur: true }} name="Rod">
            <RodModal>
            </RodModal>
          </OpenModal>
        </Button.Group>
      </Section>
    </div>
  );
}

export default Build;
