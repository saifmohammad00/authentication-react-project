import { Link } from 'react-router-dom';
import { useContext } from 'react';

import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MainNavigation = () => {
  const history=useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const handleLogout=()=>{
    authCtx.logout();
    history.replace("/auth");
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggedIn &&
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
