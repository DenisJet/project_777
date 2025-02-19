import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import { APP_ROUTES } from "./constants/routes.constants.ts";
import { Toaster } from "./components/ui/toaster.tsx";
import { RequireAuth } from "./helpers/requireAuth.tsx";
import MainLayout from "./components/MainLayout/MainLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path={APP_ROUTES.home}
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path={APP_ROUTES.login} element={<LoginPage />} />
        <Route path={APP_ROUTES.register} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
);
