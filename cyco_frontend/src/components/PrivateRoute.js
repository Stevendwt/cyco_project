// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzOTY0NDEzLCJpYXQiOjE3NTM5NjQxMTMsImp0aSI6ImEzNWI5NWM2MTQyOTRiYWNiOGYwYzg5YTE1ZmUxYjNjIiwidXNlcl9pZCI6IjIifQ.Ke7ZsD_mUfrXN1_2vwI4pFnh5Prm7fq14E7y6c5PweQ');
  return token ? children : <Navigate to="/dashboard" replace />;
};

export default PrivateRoute;
