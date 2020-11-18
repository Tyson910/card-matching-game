import { useState, useEffect } from 'react';

export default function Clock(props) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState( 0 );

 useEffect(() => {
  var timerID = setInterval( () => tick(), 1000 );

  return function cleanup() {
      clearInterval(timerID);
    };
 });

   function tick() {
    if (seconds < 59)
        setSeconds(seconds + 1)
    else{
        setSeconds( 0 )
        setMinutes(minutes + 1)
    }
   }
   
   return minutes + ' : ' + seconds;
}
