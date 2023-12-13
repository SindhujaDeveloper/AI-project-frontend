import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { type IStore } from "src/types/store";

export const PublicLayout: React.FC = () => {
  const isAuthenticated = useSelector((state: IStore) => state.auth.isAuthenticated);
  return !isAuthenticated ? (
    <main>
      <Outlet />
    </main>
  ) : <Navigate to="/app/dashboard" />;
};