import React, { useContext } from 'react';
import { updateStickyDueDate, deleteSticky } from './helper';
import { Button, Card } from 'react-bootstrap';
import { addDays, differenceInDays, format, formatDistance, formatRelative, subDays } from 'date-fns';
import { de } from 'date-fns/locale';
import _ from 'lodash';

/* helper functions */
const dueDateFormat = (date) => {
  return format(date, "dd.MM.yyyy");
}

const dateDiff = (date) => {
  return formatDistance(date, new Date(), { addSuffix: true, locale: de })
}


const cardThemeFromDiff = (date) => {
  const levels = [
    { diff: 0, variant: "danger" },
    { diff: 5, variant: "warning" },
    { diff: 1000000, variant: "success" }
  ];
  const diffDays = differenceInDays(date, new Date());

  const level = _.find(levels, (level) => {
    return level.diff >= diffDays;
  });
  return level ? level.variant : false;
}


const StickyCard = ({ docSnapshot }) => {
  const { title, description, dueDateString, recurring, interval } = docSnapshot.data();
  // check if dueDateString is a valid date
  // Date.parse will return NaN if not
  const dueDate = Date.parse(dueDateString);

  const theme = dueDate ? cardThemeFromDiff(dueDate) : "secondary";

  const resetCardFromToday = async (cardDocSnapshot) => {
    const newDateString = addDays(new Date(), interval).toString();
    await updateStickyDueDate(cardDocSnapshot.ref, newDateString);
  }

  const resetCard = async (cardDocSnapshot) => {
    const newDateString = addDays(dueDate, interval).toString();
    await updateStickyDueDate(cardDocSnapshot.ref, newDateString)
  }

  const closeCard = async (cardDocSnapshot) => {
    await deleteSticky(cardDocSnapshot.ref);
  }

  return (
    <Card bg={theme} text="white" className="mb-4">
      {dueDate ?
        <Card.Header className="font-weight-bold">{dueDateFormat(dueDate)} - {dateDiff(dueDate)}{recurring && <span> - Alle {interval} Tage</span>}</Card.Header> :
        <Card.Header>Kein Stichtag</Card.Header>
      }
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>

      <Card.Footer >
        <div className="d-md-flex justify-content-end">
          {(recurring && dueDate) &&
            <React.Fragment>
              <Button className="ml-1 mt-1" variant="dark" onClick={() => resetCardFromToday(docSnapshot)}>Von Heute Zurücksetzen</Button>
              <Button className="ml-1 mt-1" variant="dark" onClick={() => resetCard(docSnapshot)}>Zurücksetzen</Button>
            </React.Fragment>}

          <Button className="ml-1 mt-1" variant="dark" onClick={() => closeCard(docSnapshot)}>Abschließen</Button>
        </div>

      </Card.Footer>

    </Card>
  )
}

export default StickyCard;