import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function LoggedIn() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Navigate to="/" /> : <Outlet />;
}
