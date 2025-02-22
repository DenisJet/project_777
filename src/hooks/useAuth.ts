import { useEffect } from "react";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../constants/routes.constants";

export const useAuth = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuth");

  useEffect(() => {
    if (isAuth) {
      navigate(APP_ROUTES.home);
    }
  }, [isAuth, navigate]);

  return isAuth;
};
