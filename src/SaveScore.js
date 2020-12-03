import React from 'react';

export default function SaveScore({score}){

 return(
    <React.Fragment>
    <div>
    Congrats you finished in
    </div>

    <input type='text' id='scoreInput'
    name='score' readOnly 
    value= '1:32 ' />


     <div>
     Please enter a username to save your score 
     <input type='text' id='usernameInput'
     name='username' required 
     placeholder='Username'
     />
     </div>
     </React.Fragment>
 )
}