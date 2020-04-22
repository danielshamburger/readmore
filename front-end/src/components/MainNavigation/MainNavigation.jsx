import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
// import './MainNavigation.css';

const MainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <nav className="main-navigation">
            <ul>
              { context.token && <li><NavLink to="/feed">Feed</NavLink></li>}
              { context.token && <li><NavLink to="/search">Search</NavLink></li>}
              {!context.token && <li><NavLink  to="/login">Login</NavLink></li> }
              {!context.token && <li><NavLink className="btn" to="/signup">Sign Up</NavLink></li> }
              { context.token && <li><button onClick={context.logout}>Logout</button></li> }
              { context.token && <li><NavLink className="btn"  to="/new">New Post</NavLink></li> }
            </ul>
        </nav>
        );
    }}
  </AuthContext.Consumer>
);

export default MainNavigation;