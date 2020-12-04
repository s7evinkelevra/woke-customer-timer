import React, { useContext } from 'react';
import firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useSession } from '../Auth/helper';
import { Card } from 'react-bootstrap';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import { de } from 'date-fns/locale';

const StickyCard = ({doc}) => {
  const stickyId = doc.id;
  const {title, description, dueDate, recurring, interval} = doc.data();

  const dueDateFormat = (dateString) => {
    return format(new Date(dateString), "dd.MM.yyyy");
  }

  const dateDiff = (dateString) => {
    return formatDistance(new Date(dateString), new Date(), { addSuffix:true, locale: de})
  }

  return(
    <Card style={{marginBottom:"30px"}}>
      {dueDate &&
        <Card.Header>{dueDateFormat(dueDate)} - {dateDiff(dueDate)}</Card.Header>
      }
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

const StickyList = (props) => {
  const user = useSession();
  const [value, loading, error] = useCollection(
    firebase.firestore().collection(`/users/${user?.uid}/stickies`)
  );

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading....</span>}
      {value &&
        <React.Fragment>
          {value.docs.map(doc => (
            <StickyCard key={doc.id} doc={doc} />
          ))}
      </React.Fragment>
      }
    </div>
  );
};

/* {"dueDate":"3333-02-12","user":{"photoURL":null,"displayName":null,"uid":"KuR2gFAx9NfixfuTuKjVOlDkIaJ2","email":"dies.das@jenes.hier"},"description":"Eine Beschreibung","title":"Sticky situation","recurring":false,"createdAt":{"seconds":1607092943,"nanoseconds":542000000}}, */

export default StickyList;