import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userLogged } from '../redux/auth/actions';

const RequireAdmin = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        await dispatch(userLogged());
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [token, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard-peserta" replace />;
  }

  return user ? <Outlet /> : null;
};

export default RequireAdmin;
