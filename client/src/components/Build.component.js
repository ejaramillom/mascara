import React from 'react';
import '../App.css';
import { select, boolean } from '@storybook/addon-knobs';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import { OpenModal, BottleModal, BrushModal, RodModal, CapModal, WiperModal } from './OpenModal.component';

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
