import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchUser } from '../../redux/auth/actions';

import Sidebar from '../../components/sidebar';

const Dashboard = () => {
  const [fetchDone, setFetchDone] = useState(false);
  const getToken = useSelector((state) => state.auth.token);
  const getUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getUser && getToken && !fetchDone) {
      dispatch(fetchUser());
      setFetchDone(true);
    }
  }, [getUser, getToken, fetchDone, dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-10">
        <h1 className="text-2xl">Dashboard</h1>
        <p className="mb-3">Selamat datang di dashboard admin!</p>
        {getToken && <h1 className="text-2xl">{`Halo, ${getUser.name}`}</h1>}
      </main>
    </div>
  );
};

export default Dashboard;
