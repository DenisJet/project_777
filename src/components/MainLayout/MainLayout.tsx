import { Outlet } from "react-router";
import LogoutButton from "../LogoutButton/LogoutButton";

export default function MainLayout() {
  const isAuth = localStorage.getItem("isAuth");

  return (
    <>
      <header className="flex justify-between items-center p-2">
        <p className="font-bold text-lg">Logo</p>
        {isAuth && <LogoutButton />}
      </header>
      <Outlet />
    </>
  );
}
