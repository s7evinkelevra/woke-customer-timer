import React, { useMemo } from 'react';
import _ from 'lodash';
import StickyCard from './StickyCard';
import { useStickies } from './helper';


const StickyList = (props) => {
  const { stickiesRef, tagFilter } = useStickies();

  const stickies = useMemo(() => (
    stickiesRef.docs.map(docSnapshot => {
      return {
        ...docSnapshot.data(),
        snapshot: docSnapshot,
      }
    })
  ), [stickiesRef]);

  // filter stickies by tag
  // TODO(Jan): This feels dumb, refactor.
  let tagStickies;
  if(tagFilter.length > 0) {
    tagStickies = _.filter(stickies, (sticky) => {
      if(sticky.tags && sticky.tags.length > 0) {
        return (_.intersection(sticky.tags, tagFilter).length > 0)
      }else{
        return false;
      }
    })
  }else{
    tagStickies = stickies;
  }



  return (
    <div>
      {stickiesRef &&
        <React.Fragment>
        {tagStickies.map(sticky => (
              <StickyCard key={sticky.snapshot.id} {...sticky} />
            ))}
      </React.Fragment>
      }
    </div>
  );
};

/* {"dueDate":"3333-02-12","user":{"photoURL":null,"displayName":null,"uid":"KuR2gFAx9NfixfuTuKjVOlDkIaJ2","email":"dies.das@jenes.hier"},"description":"Eine Beschreibung","title":"Sticky situation","recurring":false,"createdAt":{"seconds":1607092943,"nanoseconds":542000000}}, */

export default StickyList;