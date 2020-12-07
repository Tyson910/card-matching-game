import React from 'react';

export default function SaveScore({score}){

 return(
    <form formAction='action.php' method='POST'>
    
    <div>
    Congrats you finished in
    </div>

    <input type='text' id='scoreInput'
    name='score' readOnly 
    value= {score} />

     <div>
     Please enter a username to save your score 
     </div>
     <input type='text' id='usernameInput'
     name='username' required 
     placeholder='Username'
     />

    <div>
    <input type='submit' id='submmit'
     name='submit' className='button-nav' />
    </div>

     </form>
     
 )
}