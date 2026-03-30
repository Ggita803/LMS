import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, loading, user } = useAuth();
  // Debug logging for troubleshooting
  console.log('[ProtectedRoute] user:', user, 'roles:', roles, 'isAuthenticated:', isAuthenticated, 'loading:', loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-library">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Robustly extract role from user object (handles nested user.user)
  let actualRole = null;
  if (user) {
    if (user.role) {
      actualRole = user.role;
    } else if (user.user?.role) {
      actualRole = user.user.role;
    } else if (user.user?.user?.role) {
      actualRole = user.user.user.role;
    }
  }
  if (roles && (!actualRole || !roles.includes(actualRole))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
