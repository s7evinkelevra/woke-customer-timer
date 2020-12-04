import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as ROUTES from '../config/routes';

const Landing = () => {
  return (
    <Jumbotron>
      <h1>Sticky Sachen machen yee yee</h1>
      <p>
        Text zu diesen Sachen ist mir eigentlich egal yee yee
      </p>
      <Button as={Link} to={ROUTES.SIGN_IN} variant="primary">Anmelden</Button>
    </Jumbotron>
  );
};

export default Landing;