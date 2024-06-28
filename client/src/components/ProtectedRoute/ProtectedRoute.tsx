// src/components/ProtectedRoute.tsx
import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Dashboard from "../../pages/Dashboard";

interface ProtectedRouteProps {
  roles: string[];
  children: ReactNode;
}

const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  console.log("here " + user?.role);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/not-authorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
