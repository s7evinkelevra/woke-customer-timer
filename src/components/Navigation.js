import React from 'react';


import { Link } from 'react-router-dom';
import { signOut, useSession } from './Auth/helper';

import * as ROUTES from '../config/routes';
import { Nav, Navbar } from 'react-bootstrap';


const Navigation = () => {
  const user = useSession();

  
  const nonAuthLinks = <React.Fragment>
    <Nav.Link as={Link} to={ROUTES.SIGN_IN}>Anmelden</Nav.Link>
    <Nav.Link as={Link} to={ROUTES.SIGN_UP}>Registrieren</Nav.Link>
  </React.Fragment>

  const authLinks = <React.Fragment>
    <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
    <Nav.Link as={Link} to={ROUTES.ACCOUNT}>Account</Nav.Link>
    <Nav.Link as={Link} to={ROUTES.ADMIN}>Admin</Nav.Link>
    <Nav.Link onClick={signOut}>Abmelden</Nav.Link>
  </React.Fragment>

  return(
    <Navbar className="justify-content-end" bg="light" expand="lg">
      <Nav>
        <Nav.Link as={Link} to={ROUTES.LANDING}>Landing</Nav.Link>
        {!user && nonAuthLinks}
        {user && authLinks}
      </Nav>
    </Navbar>
  )
}

export default Navigation;