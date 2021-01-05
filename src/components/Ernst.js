import React, {useState, useEffect} from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInWeeks, differenceInYears, intervalToDuration } from 'date-fns';


const Ernst = () => {
  const [nowDate, setNowDate] = useState(new Date())
  const harwtigDate = Date.parse('06 Mar 2016 03:00:00 GMT')
  const { years, months, days } = intervalToDuration({ start: harwtigDate, end: nowDate });

  const functionsForTime = [
    {fn:differenceInSeconds,name:"Sekunden"},
    {fn:differenceInMinutes,name:"Minuten"},
    {fn:differenceInHours,name:"Stunden"},
    {fn:differenceInDays,name:"Tage"},
    {fn:differenceInWeeks,name:"Wochen"},
    {fn:differenceInMonths,name:"Monate"},
    {fn:differenceInYears,name:"Jahre"}
  ];

  useEffect(() => {
    const timer=setTimeout(() => {
      setNowDate(new Date());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <React.Fragment>
      <h1>Was man so braucht.</h1>
      <h2 className="my-4">Timer für Hartwig, 14.11.1958 - 06.03.2016</h2>
      <p>Seit dem Tod von Hartwig sind {years} Jahre, {months} Monat{months!==1 && <React.Fragment>e</React.Fragment>} und {days} Tag{days!==1 && <React.Fragment>e</React.Fragment>} vergangen.</p>
      <ul className="list-group">
        {functionsForTime.map((val) => {
          return(
            <li className="list-group-item" key={val.name}>Es sind {val.fn(nowDate,harwtigDate)} {val.name} vergangen seit Hartwigs Tod.</li>
          )
        })}
      </ul>
    </React.Fragment>
  );
}

export default Ernst;