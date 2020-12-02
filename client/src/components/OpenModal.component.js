import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import Modal from "react-bulma-components/lib/components/modal";
import Button from "react-bulma-components/lib/components/button";
import Section from "react-bulma-components/lib/components/section";
import axios from "axios";
import {
  getWipers,
  getCaps,
} from "../middlewares/services";
import { useQuery } from "react-query";
import "../App.css";

//---------------- Modal main definition

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
        <Button color="dark" onClick={this.open}>
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

//---------------- Modal main definition

//---------------- Bottle modal

export const BottleModal = (props) => {
  const [bottles, setBottles] = useState([]);
  const rod = props.rod;

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get("/bottle")
      .catch(function (error) {
        console.log(error)
      });
      setBottles(data);
    }
    fetchData();
  }, []);

  const addBottle = async (data) => {
    await axios.post("/bottle", {
      name: data.name,
      drawing: data.drawing,
      mold: data.mold,
      depth: data.depth,
      thread: data.thread
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

  if (rod && rod.thread){
    const filteredBottles = bottles.filter( element => {
      return element.thread.toLowerCase().indexOf(rod.thread.toLowerCase()) !== -1;
    });

    return (
      <div>
        <OpenModal modal={{ closeOnBlur: false }} name="Bottle">
          <div className="modal-body">
            {filteredBottles.map((element) => (
              <Modal.Content>
                <Section style={{ backgroundColor: "white" }}>
                  <p>
                    <strong>{element.name}</strong>
                    <small>{element.drawing}</small> <small>{element.mold}</small>
                    <br />
                  </p>
                  <Button
                    type="submit"
                    color="info"
                    onClick={() => {
                      addBottle(element);
                    }}
                  >
                    Add Bottle
                  </Button>
                </Section>
              </Modal.Content>
            ))}
          </div>
        </OpenModal>
      </div>
    );
  }

  return (
    <div>
      <OpenModal modal={{ closeOnBlur: false }} name="Bottle">
        <div className="modal-body">
          {bottles.map((element) => (
            <Modal.Content>
              <Section style={{ backgroundColor: "white" }}>
                <p>
                  <strong>{element.name}</strong>
                  <small>{element.drawing}</small> <small>{element.mold}</small>
                  <br />
                </p>
                <Button
                  type="submit"
                  color="info"
                  onClick={() => {
                    addBottle(element);
                  }}
                >
                  Add Bottle
                </Button>
              </Section>
            </Modal.Content>
          ))}
        </div>
      </OpenModal>
    </div>
  );
};

//---------------- Bottle modal

//---------------- Brush modal

export const BrushModal = (props) => {
  const [brushes, setBrushes] = useState([]);
  const rod = props.rod;
  const bottle = props.bottle;

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get("/brush")
      .catch(function (error) {
        console.log(error)
      });
      setBrushes(data);
    }
    fetchData();
  }, []);

  const addBrush = async (data) => {
    await axios.post("/brush", {
        brush: data.brush,
        original: data.original,
        shaftLength: data.shaftLength,
        shaftDiameter: data.shaftDiameter,
        brushLength: data.brushLength,
        brushDiameter: data.brushDiameter,
        type: data.type
      })
      .then(function (response) {
        if (response.status === 200) {
          alert("Brush added to the list!");
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

  if (rod && rod.name && bottle && bottle.name){
    const filteredBrushes = brushes.filter( element => {
      let mascaraGap =  (Number(bottle.depth) - (Number(element.brushLength) + Number(rod.dimensions.length)));
      if (mascaraGap > 1 && mascaraGap < 6) {
        return element;
      } else {
        return null ;
      }
      // .shaftDiameter.toLowerCase().indexOf(rod.dimensions.brushDiameter.toLowerCase()) !== -1
    });

    return (
      <div>
        <OpenModal modal={{ closeOnBlur: false }} name="Brush">
          <div className="modal-body">
            {filteredBrushes.map((element) => (
              <Modal.Content>
              <Section style={{ backgroundColor: "white" }}>
                <p>
                  <strong>{element.brush}</strong>
                  <small>{element.drawing}</small> <small>{element.type}</small>
                  <br />
                </p>
                <Button
                  type="submit"
                  color="info"
                  onClick={() => {
                    addBrush(element);
                  }}
                >
                  Add Brush
                </Button>
              </Section>
              </Modal.Content>
            ))}
          </div>
        </OpenModal>
      </div>
    );
  } else if (rod && rod.dimensions && brushes){
    const filteredBrushes = brushes.filter( element => {
      let mascaraGap =  (Number(bottle.depth) - (Number(element.brushLength) + Number(rod.dimensions.length)));
      if (mascaraGap > 1 && mascaraGap < 6) {
        return element;
      } else {
        return null;
      }
    });

    return (
      <div>
        <OpenModal modal={{ closeOnBlur: false }} name="Brush">
          <div className="modal-body">
            {filteredBrushes.map((element) => (
              <Modal.Content>
              <Section style={{ backgroundColor: "white" }}>
                <p>
                  <strong>{element.brush}</strong>
                  <small>{element.drawing}</small> <small>{element.type}</small>
                  <br />
                </p>
                <Button
                  type="submit"
                  color="info"
                  onClick={() => {
                    addBrush(element);
                  }}
                >
                  Add Brush
                </Button>
              </Section>
              </Modal.Content>
            ))}
          </div>
        </OpenModal>
      </div>
    );
  }

  return (
    <div>
      <OpenModal modal={{ closeOnBlur: false }} name="Brush">
        <div className="modal-body">
          {brushes.map((element) => (
            <Modal.Content>
            <Section style={{ backgroundColor: "white" }}>
              <p>
                <strong>{element.brush}</strong>
                <small>{element.drawing}</small> <small>{element.type}</small>
                <br />
              </p>
              <Button
                type="submit"
                color="info"
                onClick={() => {
                  addBrush(element);
                }}
              >
                Add Brush
              </Button>
            </Section>
            </Modal.Content>
          ))}
        </div>
      </OpenModal>
    </div>
  );
};


//---------------- Brush modal

//---------------- Rod modal


export const RodModal = (props) => {
  const [rods, setRods] = useState([]);
  const bottle = props.bottle;

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get("/rod")
      .catch(function (error) {
        console.log(error)
      });
      setRods(data);
    }
    fetchData();
  }, []);

  const addRod = async (data) => {
    await axios.post("/rod", {
        name: data.name,
        drawing: data.drawing,
        thread: data.thread,
        dimensions: {
          length: data.dimensions.length,
          rodDiameter: data.dimensions.rodDiameter,
          brushDiameter: data.dimensions.brushDiameter,
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          alert("Rod added to the list!");
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

  if (bottle && bottle.thread){
    const filteredRods = rods.filter( element => {
      if (element.thread) {
        return element.thread.toLowerCase().indexOf(bottle.thread.toLowerCase()) !== -1;
      } else {
        return element;
      }
    });

    return (
      <div>
      <OpenModal modal={{ closeOnBlur: false }} name="Rod">
        <div className="modal-body">
          {filteredRods.map((element) => (
            <Modal.Content>
            <Section style={{ backgroundColor: "white" }}>
              <p>
                <strong>{element.name}</strong>
                <small>{element.thread}</small> <small>{element.drawing}</small>
                <br />
              </p>
              <Button
                type="submit"
                color="info"
                onClick={() => {
                  addRod(element);
                }}
              >
                Add Rod
              </Button>
            </Section>
            </Modal.Content>
          ))}
        </div>
      </OpenModal>
      </div>
    );
  };

  return (
    <div>
    <OpenModal modal={{ closeOnBlur: false }} name="Rod">
      <div className="modal-body">
        {rods.map((element) => (
          <Modal.Content>
          <Section style={{ backgroundColor: "white" }}>
            <p>
              <strong>{element.name}</strong>
              <small>{element.thread}</small> <small>{element.drawing}</small>
              <br />
            </p>
            <Button
              type="submit"
              color="info"
              onClick={() => {
                addRod(element);
              }}
            >
              Add Rod
            </Button>
          </Section>
          </Modal.Content>
        ))}
      </div>
    </OpenModal>
    </div>
  );
};

//---------------- Rod modal

//---------------- Wiper modal

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

//---------------- Wiper modal

//---------------- Cap modal

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

//---------------- Cap modal
