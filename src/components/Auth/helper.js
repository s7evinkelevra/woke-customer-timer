import firebase from 'firebase/app';
import { useContext } from 'react';
import { userContext } from '../userContext';


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
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const signOut = () => firebase.auth().signOut();
