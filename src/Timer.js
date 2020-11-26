import { useState, useEffect } from 'react';

export default function Clock({stopTimer}) {
  const [minutes, setMinutes] = useState( 0 );
  const [seconds, setSeconds] = useState(0);

 useEffect(() => {
    let timerID;

    if(!stopTimer){
      timerID = setInterval( () => tick(), 1000 );
    }

    else if(stopTimer){
      clearInterval(timerID);
    }

    return function cleanup() {
        clearInterval(timerID);
      }
   }
 )

   function tick() {
    if (seconds < 59){
      setSeconds(seconds + 1)
    }

    else{
        setSeconds( 0 )
        setMinutes(minutes + 1)
    }
   }

   function timeStr(){
    if(seconds < 10){
      return minutes + ' : 0' + seconds;
   }
    else{
      return minutes + ' : ' + seconds;
   }
   }

   return timeStr();
}
