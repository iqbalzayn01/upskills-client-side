import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOneSchedule } from '../../redux/schedules/actions';
import { userLogged } from '../../redux/auth/actions';
import formatDateTime from '../../utils/formatDateTime';
import formatPrice from '../../utils/formatPrice';

import CButton from '../CButton';

export default function CEventDetail() {
  const { id } = useParams();
  const { schedule } = useSelector((state) => state.schedules);
  const { user } = useSelector((state) => state.auth);
  const getToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneSchedule(id));
    if (getToken) {
      dispatch(userLogged());
    }
  }, [id, getToken, dispatch]);

  const register = (eventID, scheduleID) => {
    if (getToken && user) {
      navigate('/pendaftaran-kegiatan-pelatihan');
      console.log('EVENTID', eventID, 'SCHEDULEID', scheduleID);
      if (eventID === schedule.eventID._id) {
        console.log('DATA EVENT', schedule);
      }
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <img
        src="#"
        alt="Images"
        className="w-full h-full object-cover rounded-lg bg-gray-200"
      />
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-3xl font-semibold text-primarycolor hover:underline">
          {schedule?.eventID?.name}
        </h2>
        <p className="text-2xl text-white mt-2">
          {schedule?.eventID?.description}
        </p>
        <div className="mt-2">
          {schedule?.schedules?.map((time, subIndex) => (
            <div key={subIndex}>
              <p className="text-white">
                <span className="text-gray-500">Mulai:</span>{' '}
                {formatDateTime(time?.start_time)}
              </p>
              <p className="text-white">
                <span className="text-gray-500">Selesai:</span>{' '}
                {formatDateTime(time?.end_time)}
              </p>
            </div>
          ))}
        </div>
        <p className="text-white mt-3">
          <span className="text-gray-500">Narasumber:</span>{' '}
          {schedule?.talentID?.name}
        </p>
        <p className="text-white mt-3">
          <span className="text-gray-500">Price:</span> Rp.{' '}
          {schedule?.eventID?.price !== undefined
            ? formatPrice(schedule.eventID.price)
            : 'N/A'}
        </p>
      </div>
      <CButton
        onClick={() => register(schedule.eventID._id, schedule._id)}
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
  );
}
