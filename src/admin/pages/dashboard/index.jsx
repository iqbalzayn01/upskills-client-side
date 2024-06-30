import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { userLogged } from '../../../redux/auth/actions';

import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(userLogged());
    }
  }, [token, dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-10">
        <h1 className="text-2xl">Dashboard</h1>
        <p className="mb-3">Selamat datang di dashboard admin!</p>
        {token && (
          <>
            <h1 className="text-2xl">{`Halo, ${user.name}`}</h1>
            <h1 className="text-2xl">{user.role}</h1>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
