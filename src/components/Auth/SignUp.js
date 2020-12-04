import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';


import { createUserWithEmail, SignInLink } from './helper';
import * as ROUTES from '../../config/routes';

const SignUp = () => (
  <div>
    <h1>Registrieren</h1>
    <SignUpForm />
    <SignInLink />
  </div>
)


const SignUpForm = props => {
  let history = useHistory();

  const [firebaseError, setFirebaseError] = useState("");
  const { register, handleSubmit, watch, errors, getValues } = useForm();

  const onSubmit = async (data) => {
    try {
      const user = await createUserWithEmail(getValues('email'),getValues('password1'));
      setFirebaseError("");
      history.push(ROUTES.HOME)
    } catch (error) {
      console.log(error);
      setFirebaseError(error.message);
    }
  }

  const isSame = (pw) => {
    return pw === getValues('password1');
  }

  console.log(errors.password2);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formMail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" placeholder="Email eingeben" ref={register({ required: true })} />
        <Form.Text className="text-muted">
          {errors.email && <span>Email is required!</span>}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Passwort</Form.Label>
        <Form.Control type="password" name="password1" ref={register({ required: true })} />
        <Form.Text className="text-muted">
          {errors.password1 && <span>Password is required!</span>}
        </Form.Text>

        <Form.Label>Passwort wiederholen</Form.Label>
        <Form.Control type="password" name="password2" ref={register({ required: true, validate: isSame })} />
        <Form.Text className="text-muted">
          {errors.password2 && errors.password2.type == "validate" && <span>Passwords don't match!</span>}
          {firebaseError != "" && <span>{firebaseError}</span>}
        </Form.Text>
      </Form.Group>


      <Button variant="primary" type="submit">Registrieren</Button>
    </Form>

/*     <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email" defaultValue="test@test.test" ref={register({ required: true })} />
      {errors.email && <span>yeeee</span>}

      <input type="password" name="password1" defaultValue="test123456" ref={register({ required: true })} />
      {errors.password1 && <span>Pflichtfeld</span>}

      <input type="password" name="password2" defaultValue="test123456" ref={register({ required: true, validate: isSame })} />
      {errors.password2 && <span>Passwörter müssen Übereinstimmen!</span>}
      {errors.errorMessage?.message}

      <input type="submit" />
    </form> */
  );
}

export default SignUp;
