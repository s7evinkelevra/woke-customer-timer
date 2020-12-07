import React from 'react';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'

import { userContext } from './userContext';

import * as ROUTES from '../config/routes';

import Navigation from './Navigation';
import Landing from './Landing';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import Home from './Home';
import Ernst from './Ernst';



const login = () => {
  firebase.auth().signInWithEmailAndPassword('test@test.test', 'test123456');
}

const logout = () => {
  firebase.auth().signOut();
}

function App() {
  const [user, loading, error] = useAuthState(firebase.auth());
  console.log(user);


  return (
    <userContext.Provider
      value={{
        user: user,
        loading,
        error
      }}>
      <Router>
        <Navigation />
        <Route exact path={ROUTES.LANDING} component={Landing} />
        
        <Container>
{/*           <p>
            Current User: {user?.email} - {user?.uid}
          </p>
          <button onClick={login}>Login</button>
          <button onClick={logout}>Logout</button> */}
          {/* Define the routes here */}
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.ERNST} component={Ernst} />
        </Container>
      </Router>
    </userContext.Provider>
  );
}

export default App;
