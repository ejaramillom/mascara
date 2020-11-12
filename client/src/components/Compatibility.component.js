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
export const ThreadIncompatible = (props) => {
  return (
    <div>
      <Section>
        <Container>
          <p className="bd-notification is-warning">
            <Heading size={5} renderAs="p">Thread incompatible</Heading>
            <Heading subtitle renderAs="p">The thread in the rod and the bottle won't work</Heading>
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
export const BrushWiperIncompatible = (props) => {
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
export const RodBrushIncompatible = (props) => {
  return (
    <div>
      <Section>
        <Container>
          <p className="bd-notification is-warning">
            <Heading size={5} renderAs="p">Rod and brush incompatibles</Heading>
            <Heading subtitle renderAs="p">The brush does not fit in the rod</Heading>
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
export const GapIncompatible = (props) => {
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


export const ThreadCompatibility = (props) => {
  const thread = props.thread;
  if (thread) {
    return (
      <div>
        <ThreadCompatible />
      </div>
      );
  } else {
    return (
      <div>
       <ThreadIncompatible />
      </div>
    );
  }
}
export const BrushRodCompatibility = (props) => {
  const rodBrush = props.rodBrush;
  if (rodBrush) {
    return (
      <div>
        <RodBrushCompatible />
      </div>
      );
  } else {
    return (
      <div>
       <RodBrushIncompatible />
      </div>
    );
  }
}
export const BrushWiperCompatibility = (props) => {
  const brushWiper = props.brushWiper;
  if (brushWiper) {
    return (
      <div>
        <BrushWiperCompatible />
      </div>
      );
  } else {
    return (
      <div>
       <BrushWiperIncompatible />
      </div>
    );
  }
}
export const GapCompatibility = (props) => {
  const gap = props.gap;
  if (gap) {
    return (
      <div>
        <GapCompatible />
      </div>
      );
  } else {
    return (
      <div>
       <GapIncompatible />
      </div>
    );
  }
}
