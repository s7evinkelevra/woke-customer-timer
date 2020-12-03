import React from 'react';

import CreateSticky from './DB/CreateSticky';
import StickyList from './DB/StickyList';

const Home = () => {
  return (
    <React.Fragment>
      <h1>home yee</h1>
      <h2>Create new sticky</h2>
      <CreateSticky />
      <h2>List of Stickies</h2>
      <StickyList />
    </React.Fragment>
  );
};

export default Home;