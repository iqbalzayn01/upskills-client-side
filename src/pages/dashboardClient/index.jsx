import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userLogged } from '../../redux/auth/actions';
import { fetchAllSchedules } from '../../redux/schedules/actions';
import { fetchAllRegistration } from '../../redux/registration/actions';
import { fetchAllPay } from '../../redux/payments/actions';

import config from '../../config';
import Header from '../../components/Header';
import TrainingActivities from './trainingActivities';
import EditUserModal from './editUserModal';

export default function DashboardClient() {
  const { token, user } = useSelector((state) => state.auth);
  const { schedules } = useSelector((state) => state.schedules);
  const { registrations } = useSelector((state) => state.registration);
  const { payments } = useSelector((state) => state.payments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = config.url;

  useEffect(() => {
    if (token) {
      dispatch(userLogged());
      dispatch(fetchAllSchedules());
      dispatch(fetchAllRegistration());
      dispatch(fetchAllPay());
    }
  }, [token, dispatch]);

  const handleBtnAction = (register) => {
    if (register?.userID?._id === user?._id) {
      return navigate(`/proses-validasi/${register._id}`);
    }
  };

  const handleEdit = (user) => {
    setIsEdit(true);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  if (!token) return <Navigate to="/signin" replace />;

  return (
    <>
      <Header />
      <main className="container mx-auto p-5">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-4">My Dashboard</h1>
          <div className="flex gap-5 p-6 bg-white shadow-md rounded-xl">
            {token && (
              <div className="flex w-full items-start justify-between">
                <div className="flex items-start">
                  <img
                    src={user?.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full border border-gray-300"
                  />
                  <div className="grid grid-cols-2 ml-5">
                    <div className="mb-2">
                      <p className="text-sm text-gray-500">Nama</p>
                      <p className="font-medium text-xl text-gray-700">
                        {user?.name}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-lg text-gray-700">
                        {user?.email}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm text-gray-500">Nomor Telepon</p>
                      <p className="font-medium text-lg text-gray-700">
                        {user?.no_telp}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium text-lg text-gray-700">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  className="bg-primarycolor text-secondarycolor font-bold px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>

        <TrainingActivities
          registrations={registrations}
          schedules={schedules}
          payments={payments}
          userId={user?._id}
          baseUrl={BASE_URL}
          handleBtnAction={handleBtnAction}
        />

        {isModalOpen && (
          <EditUserModal
            onClose={() => setIsModalOpen(false)}
            isEdit={isEdit}
            user={selectedUser}
          />
        )}
      </main>
    </>
  );
}
