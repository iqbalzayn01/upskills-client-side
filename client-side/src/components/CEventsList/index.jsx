import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllSchedules } from '../../redux/schedules/actions';
import { fetchAllRegistration } from '../../redux/registration/actions';
import { userLogged } from '../../redux/auth/actions';
import { formatDateTime } from '../../utils/formatDateTime';
import formatPrice from '../../utils/formatPrice';

import CButton from '../CButton';

export default function CEventsList() {
  const { schedules } = useSelector((state) => state.schedules);
  const { user } = useSelector((state) => state.auth);
  const { registrations } = useSelector((state) => state.registration);
  const getToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSchedules());
    if (getToken) {
      dispatch(userLogged());
      dispatch(fetchAllRegistration());
    }
  }, [dispatch, getToken]);

  const register = (eventID, scheduleID) => {
    if (getToken && user) {
      navigate(`/pendaftaran-kegiatan-pelatihan/${scheduleID}`, {
        state: { eventID, scheduleID, userID: user._id },
      });
    } else {
      navigate('/signup');
    }
  };

  const filteredSchedules = schedules.filter(
    (schedule) =>
      !registrations.some(
        (regis) =>
          regis?.eventID?._id === schedule?.eventID?._id &&
          regis?.userID?._id === user?._id
      )
  );

  return (
    <div className="container-base p-5 mb-20">
      <div className="flex flex-col gap-5">
        <h2 className="w-1/4 text-[40px] text-white">Featured Events</h2>
        <div className="w-full flex flex-nowrap items-start gap-12 whitespace-nowrap overflow-x-hidden">
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule) => (
              <div
                key={schedule._id}
                className="w-[524px] bg-transparent flex flex-col gap-8 border border-white p-6 rounded-xl"
              >
                <div className="">
                  {schedule.eventID.imageID &&
                    schedule.eventID.imageID.fileName && (
                      <img
                        src={`${schedule.eventID.imageID.fileUrl}`}
                        alt={schedule.eventID.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                </div>
                <div className=" flex flex-col justify-between gap-5">
                  <Link
                    to={`/detail-kegiatan-pelatihan/${schedule._id}`}
                    className="judul-pelatihan text-3xl font-semibold text-primarycolor hover:underline"
                  >
                    {schedule.eventID.name}
                  </Link>
                  <div className="jadwal">
                    {schedule.schedules.map((time, subIndex) => (
                      <div key={subIndex} className="flex gap-10">
                        <p className="text-white">
                          <span>Mulai:</span> {formatDateTime(time.start_time)}
                        </p>
                        <p className="text-white">
                          <span>Selesai:</span> {formatDateTime(time.end_time)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg text-white text-wrap">
                    {schedule.eventID.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    <p className="bg-white text-black text-center font-bold uppercase px-3 py-2 rounded-lg">
                      {schedule.eventID.event_status}
                    </p>
                  </div>
                  <div className="flex gap-10 whitespace-normal">
                    <p className="text-white mt-3">
                      <span>Narasumber:</span> {schedule.talentID.name}
                    </p>
                    <p className="text-white mt-3">
                      <span>Price:</span> Rp.{' '}
                      {formatPrice(schedule.eventID.price)}
                    </p>
                    <p className="text-white mt-3">
                      <span>Kuota:</span> {schedule.eventID.kuota}
                    </p>
                  </div>
                </div>
                <CButton
                  onClick={() =>
                    register(schedule?.eventID?._id, schedule?._id)
                  }
                  className="flex items-center justify-center gap-3 bg-primarycolor font-semibold text-secondarycolor text-xl px-3 py-2 rounded-lg"
                >
                  <span>Daftar</span>
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
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Belum ada kegiatan pelatihan yang tersedia
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
