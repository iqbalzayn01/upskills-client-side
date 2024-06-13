import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RequireAuth() {
  const authUser = useSelector((state) => state.auth.token);

  if (!authUser) return <Navigate to="/signin" replace />;

  return <Outlet />;
}
