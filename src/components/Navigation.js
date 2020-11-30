import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from './Auth/helper';


import * as ROUTES from '../config/routes';


const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Anmelden</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_UP}>Registrieren</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
      <li>
        <button onClick={signOut}>Abmelden</button>
      </li>
    </ul>
  </div>
)

export default Navigation;