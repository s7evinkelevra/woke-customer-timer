import React from 'react';
import _ from 'lodash';

import { useStickies } from './helper';


const TagSelection = (props) => {
  const stickiesRef = useStickies();
  const stickies = stickiesRef.docs.map((doc) => (doc.data()));
  const tagCounts = _.chain(stickies).map((sticky) => (sticky.tags)).flatten().countBy().value();

  
  return Object.keys(tagCounts).map((tag) => {
    return <span className="badge badge-light rounded pr-2 pl-1 py-2 my-2 mr-2">{tag}<span className="text-white rounded bg-info px-1 ml-2">{tagCounts[tag]}</span></span>
  })
}


export default TagSelection;