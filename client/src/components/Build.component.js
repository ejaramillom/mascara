import React from 'react';
import '../App.css';
import { select, boolean } from '@storybook/addon-knobs';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import BuildModal from './BuildModal.component';
import OpenModal from './OpenModal.component';


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
            <BuildModal name="Bottle">
            </BuildModal>
          </OpenModal>
          <OpenModal modal={{ closeOnBlur: true }} name="Brush">
            <BuildModal name="Brush">
            </BuildModal>
          </OpenModal>
          <OpenModal modal={{ closeOnBlur: true }} name="Rod">
            <BuildModal name="Rod">
            </BuildModal>
          </OpenModal>
        </Button.Group>
      </Section>
    </div>
  );
}

export default Build;
