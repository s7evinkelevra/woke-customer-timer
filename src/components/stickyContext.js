import React, { createContext } from 'react';

export const stickyRefContext = createContext({
  stickiesRef:null, 
  loading:true, 
  error:false, 
  query: null,
  setQuery: () => {}
});