import { ReactNode } from "react";
import { Navigate } from "react-router";
import { APP_ROUTES } from "../constants/routes.constants";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const isAuth = localStorage.getItem("isAuth");

  if (!isAuth) {
    return <Navigate to={APP_ROUTES.login} replace />;
  }

  return children;
};
