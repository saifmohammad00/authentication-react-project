import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const authCtx=useContext(AuthContext);
  const newPasswordInputRef=useRef();
  const submitHandler=event=>{
    event.preventDefault();
    const enteredNewPassword=newPasswordInputRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBPw1kUEwJXHVuN-8V0VSXakWMvLqsqIAU',{
      method:"POST",
      body:JSON.stringify({
        idToken:authCtx.token,
        password:enteredNewPassword,
        returnSecureToken:true
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>{})
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
