import React from 'react';
import '../App.css';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';

export const ThreadCompatible = (props) => {
  return (
    <div>
      <Section>
        <Container>
          <p className="bd-notification is-success">
            <Heading size={5} renderAs="p">Thread</Heading>
            <Heading subtitle renderAs="p">The thread in the rod and the bottle are compatible</Heading>
          </p>
        </Container>
      </Section>
    </div>
  );
}

export const BrushWiperCompatible = (props) => {
  return (
    <div>
      <Section>
        <Container>
          <p className="bd-notification is-success">
            <Heading size={5} renderAs="p">Brush - wiper</Heading>
            <Heading subtitle renderAs="p">The brush fits inside the hole of the wiper</Heading>
          </p>
        </Container>
      </Section>
    </div>
  );
}
export const RodBrushCompatible = (props) => {
  return (
    <div>
      <Section>
        <Container>
          <p className="bd-notification is-success">
            <Heading size={5} renderAs="p">Rod - Brush</Heading>
            <Heading subtitle renderAs="p">The brush fits inside the hole of the rod</Heading>
          </p>
        </Container>
      </Section>
    </div>
  );
}

export const GapCompatible = (props) => {
  return (
    <div>
      <Section>
        <Container>
          <p className="bd-notification is-success">
            <Heading size={5} renderAs="p">Gap</Heading>
            <Heading subtitle renderAs="p">The gap of the assembly is between 1 and 5</Heading>
          </p>
        </Container>
      </Section>
    </div>
  );
}

export const Compatibility = (props) => {
  const thread = props.thread;
  const brushWiper = props.brushWiper;
  const rodBrush = props.rodBrush;
  const gap = props.gap;
  if (thread) {
    return (
      <div>
        <ThreadCompatible />
      </div>
      );
  } else if (rodBrush) {
    return (
      <div>
        <RodBrushCompatible />
      </div>
    );
  } else if (thread && brushWiper) {
    return (
      <div>
        <ThreadCompatible />
        <BrushWiperCompatible />
      </div>
    );
  } else if (thread && rodBrush) {
    return (
      <div>
        <ThreadCompatible />
        <RodBrushCompatible />
      </div>
    );
  } else if (thread && gap ) {
    return (
      <div>
        <ThreadCompatible />
        <GapCompatible />
      </div>
    );
  } else if (brushWiper && rodBrush ) {
    return (
      <div>
        <BrushWiperCompatible />
        <RodBrushCompatible />
      </div>
    );
  } else if (brushWiper && gap ) {
    return (
      <div>
        <BrushWiperCompatible />
        <GapCompatible />
      </div>
    );
  } else if (rodBrush && gap ) {
    return (
      <div>
        <RodBrushCompatible />
        <GapCompatible />
      </div>
    );
  } else if (thread && brushWiper && gap ) {
    return (
      <div>
        <ThreadCompatible />
        <BrushWiperCompatible />
        <GapCompatible />
      </div>
    );
  }  else if (gap ) {
    return (
      <div>
        <GapCompatible />
      </div>
    );
  } else {
    return (
      <div>
       No compatibility found
      </div>
    );
  }
}
