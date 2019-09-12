import React from 'react';
import { Redirect } from 'react-router-dom';
import {  } from '../contexts/authContext'

const PrivateRoute: React.FC = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default PrivateRoute;
