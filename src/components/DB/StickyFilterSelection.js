import React, { useEffect, useState } from 'react';

import TagSelection from './TagSelection';
import { useSession } from '../Auth/helper';
import { useStickies } from './helper';


const StickyFilterSelection = (props) => {
  const user = useSession();
  const { stickiesRef, setQuery} = useStickies();

  const [orderBy, setOrderBy] = useState("");

  // use the tagfilter to change the query
  // results in stupid shit since the taglist is also "subscribed" to the query data
  // just do this for ordering (which needs to happen on the "server")
  /* 
  useEffect(() => {
    if(tagFilter.length > 0){
      setQuery(
        firebase.firestore().collection(`/users/${user?.uid}/stickies`).where("tags", "array-contains-any", tagFilter)
      );
    }else{
      setQuery(
        firebase.firestore().collection(`/users/${user?.uid}/stickies`)
      );
    }
  },[tagFilter])
 */

  return (
    <React.Fragment>
      <TagSelection />
    </React.Fragment>
  )
}

export default StickyFilterSelection;