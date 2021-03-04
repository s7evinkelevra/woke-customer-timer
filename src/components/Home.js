import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app'
import Skeleton from 'react-loading-skeleton';
import CreateSticky from './DB/CreateSticky';
import StickyList from './DB/StickyList';
import StickyFilterSelection from './DB/StickyFilterSelection';
import { useSession } from './Auth/helper';
import { useCollection } from 'react-firebase-hooks/firestore';
import { stickyRefContext } from './stickyContext';

const Home = () => {
  const user = useSession();

  const [query, setQuery] = useState(null);
  const [tagFilter, setTagFilter] = useState([]);

  // query: firebase.firestore().collection(`/users/${user?.uid}/stickies`)
  const [valueRef, loading, error] = useCollection(query);

  // the query is dependent on the user id, so wait for userid changes(?)
  useEffect(() => {
    setQuery(firebase.firestore().collection(`/users/${user?.uid}/stickies`));
  }, [user])

  return (
    <stickyRefContext.Provider
      value={{
        stickiesRef: valueRef,
        loading,
        error,
        query,
        setQuery,
        tagFilter,
        setTagFilter,
    }}>
      <h1>Sticky Central</h1>
      <h2 className="my-4">Create new sticky</h2>
      <CreateSticky />
      <h2 className="my-4">{loading ? <Skeleton count={1} /> : "List of Stickies"}</h2>
      {loading && <Skeleton count={10} />}
      {valueRef && 
        <React.Fragment>
          <StickyFilterSelection />
          <StickyList />
        </React.Fragment>
      }
    </stickyRefContext.Provider>
  );
};

export default Home;