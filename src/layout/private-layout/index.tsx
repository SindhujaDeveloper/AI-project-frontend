import React from "react";
import Header from "../header";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { type IStore } from "src/types/store";

export const PrivateLayout: React.FC = () => {
  const isAuthenticated = useSelector((state: IStore) => state.auth.isAuthenticated);
  return isAuthenticated ? (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  ) : <Navigate to={"/login"} />;
};


