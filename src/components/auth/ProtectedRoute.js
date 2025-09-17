import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from '../common/Loading'; 

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  requiredRoles = [], 
  requiredPermissions = [],
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, hasRole, hasPermission, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        <Loading text="Loading..." />
      </div>
    );
  }

  // Check if authentication is required
  if (requireAuth && !isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check required roles
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => hasRole(role));
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check required permissions
  if (requiredPermissions.length > 0) {
    const hasRequiredPermission = requiredPermissions.some(permission => hasPermission(permission));
    if (!hasRequiredPermission) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
