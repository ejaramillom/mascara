import React from 'react';
import '../App.css';
import Modal from 'react-bulma-components/lib/components/modal';
import Content from 'react-bulma-components/lib/components/content';
import Section from 'react-bulma-components/lib/components/section';
import { getBrushes, getBottles, getRods, getWipers, getCaps } from "../middlewares/services";
import { useQuery } from "react-query";

export const BottleModal = () => {
  const { isLoading, error, data } = useQuery("bottles", getBottles);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }
  return (
    <div className="modal-body">

      { data.map( element =>
        <Modal.Content>
          <Section style={{ backgroundColor: 'white' }}>
          <p>
            <strong>{element.name }</strong> <small>{element.drawing}</small> <small>{element.mold}</small>
            <br />
            Something else
          </p>
          </Section>
        </Modal.Content>
      )}

    </div>
  );
}

export const BrushModal = () => {
  const { isLoading, error, data } = useQuery("brushes", getBrushes);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }
  return (
    <div className="modal-body">

      { data.map( element =>
        <Modal.Content>
          <Section style={{ backgroundColor: 'white' }}>
          <p>
            <strong>{element.name }</strong> <small>{element.drawing}</small> <small>{element.mold}</small>
            <br />
            Something else
          </p>
          </Section>
        </Modal.Content>
      )}

    </div>
  );
}

export const RodModal = () => {
  const { isLoading, error, data } = useQuery("rods", getRods);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }
  return (
    <div className="modal-body">

      { data.map( element =>
        <Modal.Content>
          <Section style={{ backgroundColor: 'white' }}>
          <p>
            <strong>{element.name }</strong> <small>{element.drawing}</small> <small>{element.mold}</small>
            <br />
            Something else
          </p>
          </Section>
        </Modal.Content>
      )}

    </div>
  );
}

export const WiperModal = () => {
  const { isLoading, error, data } = useQuery("wipers", getWipers);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }
  return (
    <div className="modal-body">

      { data.map( element =>
        <Modal.Content>
          <Section style={{ backgroundColor: 'white' }}>
          <p>
            <strong>{element.name }</strong> <small>{element.drawing}</small> <small>{element.mold}</small>
            <br />
            Something else
          </p>
          </Section>
        </Modal.Content>
      )}

    </div>
  );
}

export const CapModal = () => {
  const { isLoading, error, data } = useQuery("caps", getCaps);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }
  return (
    <div className="modal-body">

      { data.map( element =>
        <Modal.Content>
          <Section style={{ backgroundColor: 'white' }}>
          <p>
            <strong>{element.name }</strong> <small>{element.drawing}</small> <small>{element.mold}</small>
            <br />
            Something else
          </p>
          </Section>
        </Modal.Content>
      )}

    </div>
  );
}
