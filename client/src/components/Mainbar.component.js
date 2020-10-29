import React from 'react';

import { select, boolean } from '@storybook/addon-knobs';
import Navbar from 'react-bulma-components/lib/components/navbar';
import {
  Switch,
  Route
} from "react-router-dom";
import Add from "./Add.component";
import { Bottle, Brush, Cap, Rod, Wiper } from "./List.component";
import Build from "./Build.component";
import Index from "./Index.component";
import logo from "../images/simex-logo.png";
import { colors } from "../features/colors.js"

const Mainbar = ( props ) => {
    return (
    <div>
    <Navbar
      color={select('Color', colors)}
      fixed={select('Fixed', { default: undefined, top: 'top', bottom: 'bottom' })}
      active={boolean('Active', false)}
      transparent={boolean('Transparent', false)}
    >
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="#">
          <img src={logo} alt="Logo" width="120" height="55" />
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu >
        <Navbar.Container>
          <Navbar.Item href="/">
            Index
          </Navbar.Item>
          <Navbar.Item href="/bottle">
            Bottle
          </Navbar.Item>
          <Navbar.Item href="/brush">
            Brush
          </Navbar.Item>
          <Navbar.Item href="/build">
            Build
          </Navbar.Item>
          <Navbar.Item href="/cap">
            Cap
          </Navbar.Item>
          <Navbar.Item href="/rod">
            Rod
          </Navbar.Item>
          <Navbar.Item href="/wiper">
            Wiper
          </Navbar.Item>
          <Navbar.Item href="/add">
            Add component
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>

    <Switch>
      <Route exact path = "/" component = { ( Index ) } />
      <Route path = "/cap" component = { ( Cap ) } />
      <Route path = "/wiper" component = { ( Wiper ) } />
      <Route path = "/rod" component = { ( Rod ) } />
      <Route path = "/brush" component = {  Brush } />
      <Route path = "/bottle" component = { Bottle } />
      <Route path = "/build" component = { Build } />
      <Route path = "/add" component = { Add } />
      <Route path = "*" component = { NotFound } />
    </Switch>
  </div>
  );
}

export default Mainbar;

export const NotFound = ( props ) => {
  return (
    <h1> Pagina no encontrada </h1>
  )
}
