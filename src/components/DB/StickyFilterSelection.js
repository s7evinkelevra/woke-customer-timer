import React from 'react';

import TagSelection from './TagSelection';
import { useSession } from '../Auth/helper';
import { useStickies } from './helper';


const StickyFilterSelection = (props) => {
  const user = useSession();
  const stickiesRef = useStickies();


  return (
    <React.Fragment>
      <TagSelection />
    </React.Fragment>
  )
}

export default StickyFilterSelection;