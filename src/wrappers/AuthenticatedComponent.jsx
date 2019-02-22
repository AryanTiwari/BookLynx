import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

const AuthenticatedComponent = ({ user, needsAuth, fallback, component }) => {
  return (
    ((user && needsAuth) || (user === null && needsAuth === false)) 
    ? <div>{component}</div> 
    : <Redirect to={fallback}/>
  )  
}

export default AuthenticatedComponent;
