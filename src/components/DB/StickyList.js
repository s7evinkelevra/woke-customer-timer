import React from 'react';
import StickyCard from './StickyCard';
import { useStickies } from './helper';


const StickyList = (props) => {
  const { stickiesRef } = useStickies();

  const stickies = stickiesRef.docs.map(docSnapshot => {
    return {
      ...docSnapshot.data(),
      snapshot: docSnapshot,
    }
  });

  return (
    <div>
      {stickiesRef &&
        <React.Fragment>
        {stickies.map(sticky => (
              <StickyCard key={sticky.snapshot.id} {...sticky} />
            ))}
      </React.Fragment>
      }
    </div>
  );
};

/* {"dueDate":"3333-02-12","user":{"photoURL":null,"displayName":null,"uid":"KuR2gFAx9NfixfuTuKjVOlDkIaJ2","email":"dies.das@jenes.hier"},"description":"Eine Beschreibung","title":"Sticky situation","recurring":false,"createdAt":{"seconds":1607092943,"nanoseconds":542000000}}, */

export default StickyList;