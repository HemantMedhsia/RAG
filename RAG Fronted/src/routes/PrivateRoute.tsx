import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";


export default function PrivateRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}