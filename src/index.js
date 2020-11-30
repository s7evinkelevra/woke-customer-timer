import React from 'react';
import ReactDOM from 'react-dom';

// initialize firebase 
// before doing any app stuff....
import './components/firebase';
import App from './components/App';




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
