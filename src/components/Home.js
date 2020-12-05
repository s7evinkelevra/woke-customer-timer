import React from 'react';

import CreateSticky from './DB/CreateSticky';
import StickyList from './DB/StickyList';

const Home = () => {
  return (
    <React.Fragment>
      <h1>Sticky Central</h1>
      <h2 className="my-4">Create new sticky</h2>
      <CreateSticky />
      <h2 className="my-4">List of Stickies</h2>
      <StickyList />
    </React.Fragment>
  );
};

export default Home;