import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import {resetPasswordWithEmail} from './helper';
import { SignUpLink } from './SignUp';
import * as ROUTES from '../../config/routes';
import { Button, Form } from 'react-bootstrap';

// TODO(Jan): Implement custom Password reset flow (https://firebase.google.com/docs/auth/custom-email-handler)
const ResetPassword = () => {
  return (
    <div>
      <h1>Passwort vergessen?</h1>
      <p>Hier können Sie ihr Passwort zurück setzen.</p>
      <ResetPasswordForm />
      <SignUpLink />
    </div>
  );
};

const ResetPasswordForm = () => {
  const [firebaseError, setFirebaseError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  let history = useHistory();
  const { register, handleSubmit, watch, errors, getValues } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      await resetPasswordWithEmail(getValues('email'));
      setFirebaseError("");
      setFormSubmitted(true);
    } catch (error) {
      setFirebaseError(error.message);
      console.log(error);
    }
  }

  const renderForm = () => (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formMail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" placeholder="Email eingeben" ref={register({ required: true })} />
        <Form.Text className="text-muted">
          {errors.email && <span>Email is required!</span>}
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">Zurücksetzen</Button>
    </Form>
  )

  return (
    <React.Fragment>
      {formSubmitted ? 
        <h3>Email wurde gesendet!</h3>:
        renderForm()
        }
    </React.Fragment>
  );
}

const ResetPasswordLink = () => (
  <p>Passwort vergessen? <Link to={ROUTES.PASSWORD_RESET}>Passwort Zurücksetzen</Link></p> 
)


export default ResetPassword;
export {ResetPasswordLink};