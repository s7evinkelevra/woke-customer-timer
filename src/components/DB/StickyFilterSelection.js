import React, { useState } from 'react';

import TagSelection from './TagSelection';
import { useSession } from '../Auth/helper';
import { useStickies } from './helper';


const StickyFilterSelection = (props) => {
  const user = useSession();
  const { stickiesRef } = useStickies();

  const [tagFilter, setTagFilter] = useState([]);
  const [orderBy, setOrderBy] = useState("");



  return (
    <React.Fragment>
      <TagSelection tagFilter={tagFilter} setTagFilter={setTagFilter} />
    </React.Fragment>
  )
}

export default StickyFilterSelection;