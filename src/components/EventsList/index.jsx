import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllSchedules } from '../../redux/schedules/actions';

export default function EventsList() {
  const { schedules } = useSelector((state) => state.schedules);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSchedules());
  }, [dispatch]);

  return (
    <div className="container-base p-5">
      <div className="flex flex-col gap-5">
        <h2 className="font-semibold text-2xl text-center mb-5">
          Daftar Kegiatan Pelatihan
        </h2>
        {schedules &&
          schedules.map((schedule, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-5 p-6 shadow-md border border-slate-300 rounded-xl"
            >
              <img
                src="#"
                alt="Images"
                className="col-span-1 w-full bg-gray-500"
              />
              <div className="col-span-2 flex flex-col">
                <Link to={'/'}>{schedule.eventID.name}</Link>
                <p>{schedule.eventID.description}</p>
                <p>Narasumber: {schedule.talentID.name}</p>
                <p>{schedule.eventID.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
