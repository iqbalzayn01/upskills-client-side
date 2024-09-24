import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RequireAuth() {
  const getToken = useSelector((state) => state.auth.token);

  if (!getToken) return <Navigate to="/login" replace />;

  return <Outlet />;
}
