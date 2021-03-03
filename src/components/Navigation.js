import React from 'react';
import { Link } from 'react-router-dom';

import { useSession } from './Auth/helper';
import { SignOutButton } from './Auth/SignOut';
import * as ROUTES from '../config/routes';
import { Button, Nav, Navbar } from 'react-bootstrap';

import logo from '../logo192.png';

const Navigation = () => {
  const user = useSession();

  
  const nonAuthLinks = <React.Fragment>
    <Nav.Link as={Link} to={ROUTES.LANDING}>Landing</Nav.Link>
    <Nav.Link as={Link} to={ROUTES.SIGN_IN}>Anmelden</Nav.Link>
    <Nav.Link as={Link} to={ROUTES.SIGN_UP}>Registrieren</Nav.Link>
  </React.Fragment>

  const authLinks = <React.Fragment>
    <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
    <Nav.Link as={Link} to={ROUTES.ERNST}>Ernst</Nav.Link>
    <Nav.Link as={SignOutButton} variant="dark" className="text-white ml-1"></Nav.Link>
  </React.Fragment>

  return(
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <img alt="brand logo" src={logo} width="30" height="30" />
        Stickyboi
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {!user && nonAuthLinks}
          {user && authLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;