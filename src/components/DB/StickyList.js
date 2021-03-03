import React from 'react';
import firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore';

import { useSession } from '../Auth/helper';
import StickyCard from './StickyCard';

import _ from 'lodash';
import { useStickies } from './helper';


const StickyList = (props) => {
  const user = useSession();
  const stickiesRef = useStickies();

  return (
    <div>
      {stickiesRef &&
        <React.Fragment>
        {stickiesRef.docs.map(docSnapshot => {
            /* console.log(docSnapshot.data()); */
            return(
              <StickyCard key={docSnapshot.id} docSnapshot={docSnapshot} />
            )
          })}
      </React.Fragment>
      }
    </div>
  );
};

/* {"dueDate":"3333-02-12","user":{"photoURL":null,"displayName":null,"uid":"KuR2gFAx9NfixfuTuKjVOlDkIaJ2","email":"dies.das@jenes.hier"},"description":"Eine Beschreibung","title":"Sticky situation","recurring":false,"createdAt":{"seconds":1607092943,"nanoseconds":542000000}}, */

export default StickyList;