import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { loginWithEmail } from './helper';
import { SignUpLink } from './SignUp';

import * as ROUTES from '../../config/routes';

const SignIn = (props) => (
  <div>
    <h1>Anmelden</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const SignInForm = props => {

  let history = useHistory();
  const { register, handleSubmit, watch, errors, getValues } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const user = await loginWithEmail(getValues('email'), getValues('password1'));
      history.push(ROUTES.HOME);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email" defaultValue="test@test.test" ref={register({ required: true })} />
      {errors.email && <span>yeeee</span>}

      <input name="password1" defaultValue="test123456" ref={register({ required: true })} />
      {errors.password1 && <span>Pflichtfeld</span>}

      <input type="submit" />
    </form>
  );
}

export default SignIn;

