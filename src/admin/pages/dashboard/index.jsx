import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { userLogged } from '../../../redux/auth/actions';
import { fetchAllUsers } from '../../../redux/users/actions';
import { fetchAllTalents } from '../../../redux/talents/actions';
import { fetchAllEvents } from '../../../redux/events/actions';
import { fetchAllRegistration } from '../../../redux/registration/actions';

import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { talents } = useSelector((state) => state.talents);
  const { events } = useSelector((state) => state.events);
  const { registrations } = useSelector((state) => state.registration);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(userLogged());
      dispatch(fetchAllUsers());
      dispatch(fetchAllTalents());
      dispatch(fetchAllEvents());
      dispatch(fetchAllRegistration());
    }
  }, [token, dispatch]);

  const pesertaCount = users.filter((user) => user.role === 'peserta').length;
  const talentsCount = talents.length;
  const eventsCount = events.length;
  const registrationsCount = registrations.length;

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-10">
        <h1 className="text-3xl mb-1">Dashboard</h1>
        <p className="text-lg mb-3">Selamat datang di dashboard admin!</p>
        {token && (
          <>
            <h1 className="text-2xl">{`Halo, ${user.name}`}</h1>
            <div className="mt-20">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between w-full p-5 bg-white rounded-md shadow">
                  <h2 className="text-2xl font-medium w-1/2">Data Peserta</h2>
                  <p className="text-5xl font-semibold">{pesertaCount}</p>
                </div>
                <div className="flex justify-between w-full p-5 bg-white rounded-md shadow">
                  <h2 className="text-2xl font-medium w-1/2">
                    Data Narasumber
                  </h2>
                  <p className="text-5xl font-semibold">{talentsCount}</p>
                </div>
                <div className="flex justify-between w-full p-5 bg-white rounded-md shadow">
                  <h2 className="text-2xl font-medium w-1/2">Data Kegiatan</h2>
                  <p className="text-5xl font-semibold">{eventsCount}</p>
                </div>
                <div className="flex justify-between w-full p-5 bg-white rounded-md shadow">
                  <h2 className="text-2xl font-medium w-1/2">
                    Data Pendaftaran
                  </h2>
                  <p className="text-5xl font-semibold">{registrationsCount}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
