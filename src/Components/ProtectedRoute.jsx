// import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, isCheckingAuth }) {
  if (isCheckingAuth) {
    return <div className="px-4 py-10 text-center text-slate-500">Checking your session...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
