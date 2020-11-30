import React, {useContext} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { createUserWithEmail } from './helper';
import * as ROUTES from '../../config/routes';

const SignUp = () => (
  <div>
    <h1>Registrieren</h1>
    <SignUpForm />
  </div>
)


const SignUpForm = props => {
  let history = useHistory();

  const { register, handleSubmit, watch, errors, getValues } = useForm();

  const onSubmit = async (data) => {
    try {
      const user = await createUserWithEmail(getValues('email'),getValues('password1'));
      history.push(ROUTES.HOME)
    } catch (error) {
      console.log(error);
    }
  }

  const isSame = (pw) => {
    return pw === getValues('password1');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email" defaultValue="test@test.test" ref={register({ required: true })} />
      {errors.email && <span>yeeee</span>}

      <input name="password1" defaultValue="test123456" ref={register({ required: true })} />
      {errors.password1 && <span>Pflichtfeld</span>}

      <input name="password2" defaultValue="test123456" ref={register({ required: true, validate: isSame })} />
      {errors.password2 && <span>Passwörter müssen Übereinstimmen!</span>}
      {errors.errorMessage?.message}

      <input type="submit" />
    </form>
  );
}

const SignUpLink = () => (
  <p>
    Noch keinen Account? <Link to={ROUTES.SIGN_UP}>Registrieren</Link>
  </p>
)

export { SignUpLink };
export default SignUp;
