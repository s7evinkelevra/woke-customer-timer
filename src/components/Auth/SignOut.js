import React from 'react';
import { useHistory } from 'react-router-dom';
import { signOut } from './helper';

import * as ROUTES from '../../config/routes';
import { Button } from 'react-bootstrap';

const SignOut = () => {
  return (
    <div>
      <h1>Abmelden</h1>
      <SignOutButton />
    </div>
  );
};

const SignOutButton = (props) => {
  let history = useHistory()

  const signOutRedirect = () => {
    signOut();
    history.push(ROUTES.LANDING);
  }

  return(
    <Button {...props} onClick={signOutRedirect}>Abmelden</Button>
  )
}

export {SignOutButton};
export default SignOut;