import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RequireAuth() {
  const { token } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/signin" replace />;

  return <Outlet />;
}
