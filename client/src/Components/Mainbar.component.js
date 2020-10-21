import React, {
   useState
 } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Top from "./Top";
import Favorite from "./Favorite";
import Playing from "./Playing";
import Popular from "./Popular";
import New from "./New";
import Login from "./Login";
import Register from "./Register";
import withAuth from "./withAuth";

const Mainbar = ( props ) => {
  const [ collapsed, setCollapsed ] = useState( true );
  const toggleNavbar = () => setCollapsed( !collapsed );
  return (
    <div>
      <Navbar color = "faded" light>
        <NavbarBrand href = "/" className = "mr-auto">Mascaras simex</NavbarBrand>
        <NavbarToggler onClick = { toggleNavbar } className = "mr-2" />
        <Collapse isOpen = { !collapsed } navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href = "/">Inicio</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href = "/cap">Sobretapa</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href = "/wiper">Escurridor</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href = "/rod">Tapavástagos</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href = "/brush">Aplicadores</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href = "/bottle">Ingresar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href = "/build">Ensamblar</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <Switch>
        <Route exact path = "/" component = { ( Index ) } />
        <Route path = "/cap" component = { ( Cap ) } />
        <Route path = "/wiper" component = { ( Wiper ) } />
        <Route path = "/rod" component = { ( Rod ) } />
        <Route path = "/brush" component = {  Brush } />
        <Route path = "/bottle" component = { Bottle } />
        <Route path = "/build" component = { Build } />
        <Route path = "*" component = { NotFound } />
      </Switch>
    </div>
  );
}

export default Mainbar;

export const NotFound = ( props ) => {
  return (
    <h1>Pagina no encontrada</h1>
  )
}
