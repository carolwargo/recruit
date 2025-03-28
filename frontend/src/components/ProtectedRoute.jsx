import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ token }) => {
  return token ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;