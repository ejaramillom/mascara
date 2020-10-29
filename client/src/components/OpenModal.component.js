import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bulma-components/lib/components/modal';
import Button from 'react-bulma-components/lib/components/button';

class OpenModal extends React.Component {
  static propTypes = {
    modal: PropTypes.object,
    children: PropTypes.node.isRequired,
    name: PropTypes.object
  }

  static defaultProps = {
    modal: {},
    name: "name"
  }

  state = {
    show: false,
  }

  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });

  render() {
    return (
      <div>
        <Button color="info" onClick={this.open}> {this.props.name} </Button>
        <Modal show={this.state.show} onClose={this.close} {...this.props.modal}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default OpenModal;
