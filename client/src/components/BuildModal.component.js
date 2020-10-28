import React from 'react';
import '../App.css';
import Modal from 'react-bulma-components/lib/components/modal';
import Image from 'react-bulma-components/lib/components/image';
import Media from 'react-bulma-components/lib/components/media';
import Content from 'react-bulma-components/lib/components/content';
import Level from 'react-bulma-components/lib/components/level';
import Button from 'react-bulma-components/lib/components/button';

const BuildModal = ({name}) => {
  return (
    <div>
    <Modal.Card>
      <Modal.Card.Head>
        <Modal.Card.Title>
        { name }
        </Modal.Card.Title>
      </Modal.Card.Head>
      <Modal.Card.Body>
        <Media>
          <Media.Item renderAs="figure" position="left">
            <Image size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
          </Media.Item>
          <Media.Item>
            <Content>
              <p>
                <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                <br />
                If the children of the Modal is a card, the close button will be on the Card Head instead than the top-right corner
                You can also pass showClose = false to Card.Head to hide the close button
              </p>
            </Content>
            <Level breakpoint="mobile">
              <Level.Side align="left">
                <Button link>Like</Button>
                <Button link>Share</Button>
              </Level.Side>
            </Level>
          </Media.Item>
        </Media>
      </Modal.Card.Body>
      <Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}>
        <p>
          Lorem Ipsum...
        </p>
      </Modal.Card.Foot>
    </Modal.Card>
    </div>
  );
}

export default BuildModal;
