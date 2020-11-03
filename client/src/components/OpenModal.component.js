import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bulma-components/lib/components/modal";
import Button from "react-bulma-components/lib/components/button";
import Content from "react-bulma-components/lib/components/content";
import Section from "react-bulma-components/lib/components/section";
import { Redirect } from 'react-router';
import { select, boolean } from "@storybook/addon-knobs";
import axios from "axios";

import {
  getBrushes,
  getBottles,
  getRods,
  getWipers,
  getCaps,
} from "../middlewares/services";
import { useQuery } from "react-query";
import { colors } from "../features/colors.js";
import "../App.css";

export class OpenModal extends React.Component {
  static propTypes = {
    modal: PropTypes.object,
    children: PropTypes.node.isRequired,
    name: PropTypes.string,
  };

  static defaultProps = {
    modal: {},
    name: "name",
  };

  state = {
    show: false,
  };

  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });

  render() {
    return (
      <div>
        <Button color="info" onClick={this.open}>
          {" "}
          {this.props.name}{" "}
        </Button>
        <br />
        <Modal
          show={this.state.show}
          onClose={this.close}
          {...this.props.modal}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export const BottleModal = () => {
  const addBottle = async (data) => {
    const ServerCall = await axios
      .post("/bottle", {
        bottleName: data.name,
      })
      .then(function (response) {
        if (response.status === 200) {
          alert("Bottle added to the list!");
          console.log("Succesfully added");
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
  const { isLoading, error, data } = useQuery("bottles", getBottles);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }

  return (
    <div>
      <OpenModal modal={{ closeOnBlur: true }} name="Bottle">
        <div className="modal-body">
          {data.map((element) => (
            <Modal.Content>
              <Section style={{ backgroundColor: "white" }}>
                <p>
                  <strong>{element.name}</strong>{" "}
                  <small>{element.drawing}</small> <small>{element.mold}</small>
                  <br />
                  Prueba de modal
                </p>
                <Button
                  type="submit"
                  color="info"
                  onClick={() => {
                    addBottle(element);
                  }}
                >
                  Add
                </Button>
              </Section>
            </Modal.Content>
          ))}
        </div>
      </OpenModal>
    </div>
  );
};

export const BrushModal = () => {
  const { isLoading, error, data } = useQuery("brushes", getBrushes);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }
  return (
    <div>
      <OpenModal modal={{ closeOnBlur: true }} name="Brush">
        <div className="modal-body">
          <h1>hola</h1>
          {data.map((element) => (
            <Modal.Content>
              <Section style={{ backgroundColor: "white" }}>
                <p>
                  <strong>{element.name}</strong>{" "}
                  <small>{element.drawing}</small> <small>{element.mold}</small>
                  <br />
                  Something else
                </p>
              </Section>
            </Modal.Content>
          ))}
        </div>
      </OpenModal>
    </div>
  );
};

export const RodModal = () => {
  const { isLoading, error, data } = useQuery("rods", getRods);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }
  return (
    <div>
      <OpenModal modal={{ closeOnBlur: true }} name="Rod">
        <div className="modal-body">
          {data.map((element) => (
            <Modal.Content>
              <Section style={{ backgroundColor: "white" }}>
                <p>
                  <strong>{element.name}</strong>{" "}
                  <small>{element.drawing}</small> <small>{element.mold}</small>
                  <br />
                  Something else
                </p>
              </Section>
            </Modal.Content>
          ))}
        </div>
      </OpenModal>
    </div>
  );
};

export const WiperModal = () => {
  const { isLoading, error, data } = useQuery("wipers", getWipers);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }
  return (
    <div className="modal-body">
      {data.map((element) => (
        <OpenModal modal={{ closeOnBlur: true }} name="Wiper">
          <Modal.Content>
            <Section style={{ backgroundColor: "white" }}>
              <p>
                <strong>{element.name}</strong> <small>{element.drawing}</small>{" "}
                <small>{element.mold}</small>
                <br />
                Something else
              </p>
            </Section>
          </Modal.Content>
        </OpenModal>
      ))}
    </div>
  );
};

export const CapModal = () => {
  const { isLoading, error, data } = useQuery("caps", getCaps);
  if (isLoading) return "Loading...";
  if (error) {
    return "Oops! " + error.message;
  }
  return (
    <div className="modal-body">
      {data.map((element) => (
        <OpenModal modal={{ closeOnBlur: true }} name="Wiper">
          <Modal.Content>
            <Section style={{ backgroundColor: "white" }}>
              <p>
                <strong>{element.name}</strong> <small>{element.drawing}</small>{" "}
                <small>{element.mold}</small>
                <br />
                Something else
              </p>
            </Section>
          </Modal.Content>
        </OpenModal>
      ))}
    </div>
  );
};
