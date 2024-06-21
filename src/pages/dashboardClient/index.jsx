import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userLogged } from '../../redux/auth/actions';

import Header from '../../components/Header';
// import MyEvents from './myEvents';

export default function DashboardClient() {
  const getToken = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getToken) {
      dispatch(userLogged());
    }
  }, [getToken, dispatch]);

  if (!getToken) return <Navigate to="/signin" replace />;

  return (
    <>
      <Header />
      <main>
        <div className="container-base p-5">
          <div className="flex flex-col gap-5 w-full">
            <h1 className="font-semibold text-3xl">My Dashboard</h1>
            <div className="flex gap-5 p-6 mb-5 shadow-md border border-slate-300 rounded-xl">
              {getToken && (
                <>
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full border border-gray-300"
                  />
                  <div className="flex flex-col justify-center gap-3">
                    <div>
                      <p className="text-sm text-gray-500">Nama</p>
                      <p className="font-medium text-2xl text-gray-700">
                        {user.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-lg text-gray-700">
                        {user.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nomor Telepon</p>
                      <p className="font-medium text-lg text-gray-700">
                        {user.no_telp}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium text-lg text-gray-700">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* <h1 className="font-semibold text-3xl">Daftar Kegiatan</h1>
          <MyEvents /> */}
          </div>
        </div>
      </main>
    </>
  );
}
