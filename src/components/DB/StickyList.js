import React, { useContext } from 'react';
import firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useSession } from '../Auth/helper';



const StickyList = () => {
  const user = useSession();
  const [value, loading, error] = useCollection(
    firebase.firestore().collection(`/users/${user?.uid}/stickies`)
  );

  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading....</span>}
        {value &&
          <span>
            Collection:{' '}
            {value.docs.map(doc => (
              <React.Fragment key={doc.id}>
                {JSON.stringify(doc.data())}, {' '}
              </React.Fragment>
            ))}
          </span>
        }
      </p>
    </div>
  );
};



export default StickyList;