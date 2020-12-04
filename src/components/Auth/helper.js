import firebase from 'firebase/app';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { userContext } from '../userContext';
import { createUserData } from '../DB/helper';
import * as ROUTES from '../../config/routes';

// just a wrapper for accessing the data from the provider
export const useSession = () => {
  const {user} = useContext(userContext);
  return user;
}

// could also include flows for logging in with github/google 
// user information for front-end is is accessible through the useAuthState hook, seperate from this stuff here

export const loginWithEmail = async (email, password) => {
  try {
    const results = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createUserWithEmail = async (email, password) => {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
    
    await createUserData(result.user, {userFuckabilityStatus: Math.ceil(Math.random()*10)});
  } catch (err) {
    console.error(err);
    throw err;
  }
};


const SignUpLink = () => (
  <p>
    Noch keinen Account? <Link to={ROUTES.SIGN_UP}>Registrieren</Link>
  </p>
)
export { SignUpLink };

const SignInLink = () => (
  <p>
    Schon einen Account? <Link to={ROUTES.SIGN_IN}>Anmelden</Link>
  </p>
)
export { SignInLink };


export const signOut = () => firebase.auth().signOut();



