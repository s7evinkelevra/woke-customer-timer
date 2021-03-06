import React, { useEffect, useMemo } from 'react';
import _ from 'lodash';
import StickyCard from './StickyCard';
import { useStickies } from './helper';


const StickyList = (props) => {
  const { stickiesRef, tagFilter, setTagFilter } = useStickies();

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
  let tagStickies = [];
  if(tagFilter.length > 0) {
    tagStickies = _.filter(stickies, (sticky) => {
      if(sticky.tags && sticky.tags.length > 0) {
        return (_.intersection(sticky.tags, tagFilter).length > 0)
      }else{
        return false;
      }
    });
  }

  // this is necessary to clear the tag filter when there is a tag selected but no sticky left in that tag.
  // Tag disappears from tag list when there is no sticky left with that tag. 
  // Then you can't unselect that tag and it's stuck in the tagFilter list
  useEffect(() => {
    if(tagStickies.length === 0) { setTagFilter([])}
  }, [stickies]);

  // if there are no stickies that match the filter, show all stickies
  // this happens when no tag is selected or the tag is selected but there is no sticky in that tag left
  const renderStickies = tagStickies.length > 0 ? tagStickies : stickies;

  return (
    <div>
      {stickiesRef &&
        <React.Fragment>
        {renderStickies.map(sticky => (
              <StickyCard key={sticky.snapshot.id} {...sticky} />
            ))}
      </React.Fragment>
      }
    </div>
  );
};

/* {"dueDate":"3333-02-12","user":{"photoURL":null,"displayName":null,"uid":"KuR2gFAx9NfixfuTuKjVOlDkIaJ2","email":"dies.das@jenes.hier"},"description":"Eine Beschreibung","title":"Sticky situation","recurring":false,"createdAt":{"seconds":1607092943,"nanoseconds":542000000}}, */

export default StickyList;