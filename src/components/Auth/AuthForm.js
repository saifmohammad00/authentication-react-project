import { useState, useRef,useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx= useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPw1kUEwJXHVuN-8V0VSXakWMvLqsqIAU';
    }
    else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPw1kUEwJXHVuN-8V0VSXakWMvLqsqIAU';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      setIsLoading(false);
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errormessage = "Authentication Failed!";
          throw new Error(errormessage);
        })
      }
    })
    .then((data)=>{
      authCtx.login(data.idToken);
    })
    .catch(error=>{
      alert(error.message);
    })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
