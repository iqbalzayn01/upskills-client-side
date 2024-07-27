import { useEffect, useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userLogged } from '../../redux/auth/actions';
import { fetchAllSchedules } from '../../redux/schedules/actions';
import { fetchAllRegistration } from '../../redux/registration/actions';
import { fetchAllPay } from '../../redux/payments/actions';

import formatPrice from '../../utils/formatPrice';
import formatDateTime from '../../utils/formatDateTime';
import config from '../../config';
import Header from '../../components/Header';
import CButton from '../../components/CButton';
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

        {/* Kegiatan Pelatihan Yang Diikuti */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">
            Kegiatan Pelatihan Yang Diikuti
          </h2>
          <div className="grid gap-6">
            {registrations && registrations.length > 0 ? (
              registrations
                .filter((register) => register?.userID?._id === user?._id)
                .map((register, index) => {
                  const schedule = schedules.find(
                    (sched) => sched.eventID._id === register.eventID._id
                  );
                  const payment = payments.find(
                    (pay) => pay?.registrationID?._id === register._id
                  );

                  return (
                    <div
                      key={index}
                      className="p-6 bg-secondarycolor rounded-xl shadow-md"
                    >
                      {schedule && (
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            {schedule.eventID.imageID && (
                              <img
                                src={`${BASE_URL}${schedule.eventID.imageID.fileName}`}
                                alt={register.eventID.name}
                                className="object-cover w-full h-full rounded-lg"
                              />
                            )}
                          </div>
                          <div className="detail">
                            <h3 className="text-xl font-semibold text-primarycolor hover:underline">
                              {schedule.eventID.name}
                            </h3>
                            <p className="text-white text-lg mt-2">
                              {schedule.eventID.description}
                            </p>
                            <div className="flex flex-wrap mt-2">
                              <div className="w-full sm:w-1/2 md:w-full">
                                <p className="text-white">
                                  <span className="text-gray-500">Kuota:</span>{' '}
                                  {schedule.eventID.kuota}
                                </p>
                              </div>
                              <div className="w-full sm:w-1/2 md:w-full">
                                <p className="text-white">
                                  <span className="text-gray-500">
                                    Narasumber:
                                  </span>{' '}
                                  {schedule.talentID.name}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap mt-2">
                              <div className="w-full sm:w-1/2 md:w-full">
                                <p className="text-white">
                                  <span className="text-gray-500">Mulai:</span>{' '}
                                  {formatDateTime(
                                    schedule.schedules[0]?.start_time
                                  )}
                                </p>
                              </div>
                              <div className="w-full sm:w-1/2 md:w-full">
                                <p className="text-white">
                                  <span className="text-gray-500">
                                    Selesai:
                                  </span>{' '}
                                  {formatDateTime(
                                    schedule.schedules[0]?.end_time
                                  )}
                                </p>
                              </div>
                            </div>
                            <p className="text-white mt-2">
                              <span className="text-gray-500">Harga:</span> Rp.{' '}
                              {formatPrice(schedule.eventID.price)}
                            </p>
                            <p className="text-white mt-2">
                              <span className="text-gray-500">
                                Link Meeting:
                              </span>{' '}
                              {payment ? (
                                <Link
                                  to={schedule.eventID.linkMeeting}
                                  target="_blank"
                                  className="underline"
                                >
                                  {schedule.eventID.linkMeeting}
                                </Link>
                              ) : (
                                <span className="text-gray-500">-</span>
                              )}
                            </p>
                            {payment ? (
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-center gap-3 bg-primarycolor font-semibold text-secondarycolor text-xl px-3 py-2 rounded-lg mt-3">
                                  <span>Sudah Terdaftar</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 bg-white font-semibold text-secondarycolor text-xl px-3 py-2 rounded-lg mt-3">
                                  <Link
                                    to={`/bukti-pendaftaran/${payment._id}`}
                                  >
                                    Lihat Bukti Pendaftaran
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              <CButton
                                onClick={() => handleBtnAction(register)}
                                className="flex items-center justify-center gap-3 bg-primarycolor font-semibold text-secondarycolor text-xl px-3 py-2 rounded-lg mt-3"
                              >
                                <span>Proses Validasi</span>
                                <svg
                                  width="11"
                                  height="11"
                                  viewBox="0 0 11 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.04579 8.02421L9.04579 8.02438C9.0459 8.20537 9.11785 8.37892 9.24583 8.5069C9.37381 8.63488 9.54736 8.70683 9.72835 8.70694H9.72873C9.90972 8.70683 10.0833 8.63488 10.2112 8.5069C10.3392 8.37892 10.4112 8.20537 10.4113 8.02438L10.4113 8.02419L10.4113 1.52464L10.4113 1.52446C10.4112 1.34346 10.3392 1.16992 10.2112 1.04193C10.0833 0.913954 9.90972 0.842005 9.72873 0.841892L9.72854 0.841892L3.22899 0.841892L3.22899 0.841705L3.21841 0.842079C3.04155 0.848322 2.87402 0.922968 2.75111 1.05029C2.6282 1.17761 2.55951 1.34767 2.55951 1.52464C2.55951 1.70161 2.6282 1.87167 2.75111 1.99899C2.87402 2.12632 3.04155 2.20096 3.21841 2.20721L3.2184 2.20739L3.22897 2.20739L8.0795 2.20779L1.3017 8.98559C1.17362 9.11367 1.10166 9.28739 1.10166 9.46853C1.10166 9.64967 1.17362 9.82339 1.3017 9.95148C1.42979 10.0796 1.60351 10.1515 1.78465 10.1515C1.96579 10.1515 2.13951 10.0796 2.2676 9.95148L9.0454 3.17368L9.04579 8.02421Z"
                                    fill="#002333"
                                    stroke="#002333"
                                    strokeWidth="0.6"
                                  />
                                </svg>
                              </CButton>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
            ) : (
              <p className="text-center text-gray-800">
                Belum ada kegiatan pelatihan yang diikuti
              </p>
            )}
          </div>
        </div>
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
