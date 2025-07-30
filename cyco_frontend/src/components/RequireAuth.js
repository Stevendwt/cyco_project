// src/components/RequireAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('access');
  return token ? children : <Navigate to="/dashboard" replace />;
};

export default RequireAuth;
