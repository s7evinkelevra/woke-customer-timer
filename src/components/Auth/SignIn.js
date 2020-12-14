import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { loginWithEmail } from './helper';
import { SignUpLink } from './SignUp';
import { ResetPasswordLink } from './ResetPassword';

import * as ROUTES from '../../config/routes';
import { Button, Form } from 'react-bootstrap';

const SignIn = () => (
  <div>
    <h1>Anmelden</h1>
    <SignInForm />
    <SignUpLink />
    <ResetPasswordLink />
  </div>
);

const SignInForm = props => {
  const [firebaseError, setFirebaseError] = useState("");

  let history = useHistory();
  const { register, handleSubmit, watch, errors, getValues } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      await loginWithEmail(getValues('email'), getValues('password'));
      setFirebaseError("");
      history.push(ROUTES.HOME);
    } catch (error) {
      setFirebaseError(error.message);
      console.log(error);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formMail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" placeholder="Email eingeben" defaultValue="test@test.test" ref={register({required:true})} />
        <Form.Text className="text-muted">
          {errors.email && <span>Email is required!</span>}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Passwort</Form.Label>
        <Form.Control type="password" name="password" defaultValue="test123456" ref={register({ required: true })} />
        <Form.Text className="text-muted">
          {errors.password && <span>Password is required!</span>}
          {firebaseError !== "" && <span>{firebaseError}</span>}
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">Anmelden</Button>
    </Form>

/*     <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email" defaultValue="test@test.test" ref={register({ required: true })} />
      {errors.email && <span>yeeee</span>}

      <input type="password" name="password1" defaultValue="test123456" ref={register({ required: true })} />
      {errors.password1 && <span>Pflichtfeld</span>}

      <input type="submit" />
    </form> */
  );
}

const SignInLink = () => (
  <p>
    Haben Sie schon einen Account? <Link to={ROUTES.SIGN_IN}>Anmelden</Link>
  </p>
)

export { SignInLink };
export default SignIn;

