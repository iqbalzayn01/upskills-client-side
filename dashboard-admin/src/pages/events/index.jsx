import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { fetchAllEvents, fetchDeleteEvent } from '../../redux/events/actions';
import {
  fetchAllSchedules,
  fetchDeleteSchedule,
} from '../../redux/schedules/actions';

import Sidebar from '../../components/sidebar';
import PopUp from '../../components/popUp';
import AddEventModal from './addEventModal';
import AddScheduleModal from './addScheduleModal';

export default function DataKegiatan() {
  const { events, error } = useSelector((state) => state.events);
  const { schedules } = useSelector((state) => state.schedules);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectEventID, setSelectEventID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEvents());
    dispatch(fetchAllSchedules());
  }, [dispatch]);

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), 'dd MMM yyyy, HH:mm');
  };

  // Events
  const formatPrice = (price) => {
    return price.toLocaleString('id-ID');
  };

  const handleCreateEvent = () => {
    setIsEdit(false);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (eventData) => {
    setIsEdit(true);
    setSelectedEvent(eventData);
    setIsModalOpen(true);
  };

  const handlePopUpDelete = () => {
    setIsPopUpOpen(true);
  };

  const handleDeleteEvent = (id) => {
    dispatch(fetchDeleteEvent(id));
    setIsPopUpOpen(false);
  };

  // Schedules
  const handleCreateSchedule = (eventID) => {
    setSelectEventID(eventID);
    setScheduleOpen(true);
  };

  const handleDeleteSchedule = (id) => {
    dispatch(fetchDeleteSchedule(id));
    setIsPopUpOpen(false);
  };

  return (
    <div className="w-full">
      <Sidebar />
      <main className="ml-64 p-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl">Data Kegiatan Pelatihan</h1>
          <button
            onClick={handleCreateEvent}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Tambah
          </button>
        </div>
        <hr className="mb-10" />
        {error && <p className="text-red-500">Error fetching data: {error}</p>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {events &&
            events.map((event) => {
              return (
                <div
                  key={event._id}
                  className="card border border-slate-400 p-10 rounded-lg"
                >
                  <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-medium">{event.name}</h2>
                    <hr />
                    <p>{event.description}</p>
                    {schedules &&
                      schedules
                        .filter(
                          (schedule) => schedule.eventID._id === event._id
                        )
                        .map((schedule, index) => (
                          <p key={index}>Talent: {schedule.talentID.name}</p>
                        ))}
                    <p>Link: {event.linkMeeting}</p>
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold">Lokasi:</p>
                      <p>{event.location}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">Jadwal:</p>
                      <button
                        className="bg-emerald-500 text-white px-2 py-1 rounded"
                        onClick={() => handleCreateSchedule(event._id)}
                      >
                        Atur Jadwal
                      </button>
                      {schedules &&
                        schedules
                          .filter(
                            (schedule) => schedule.eventID._id === event._id
                          )
                          .map((schedule, index) => (
                            <div key={index}>
                              <div>
                                {schedule.schedules.map((time, subIndex) => (
                                  <div key={subIndex}>
                                    <p>
                                      mulai: {formatDateTime(time.start_time)}
                                    </p>
                                    <p>
                                      selesai: {formatDateTime(time.end_time)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center gap-2">
                                {/*  */}
                                <button
                                  className="bg-red-500 text-white px-2 py-1 rounded"
                                  onClick={() =>
                                    handleDeleteSchedule(schedule._id)
                                  }
                                >
                                  Hapus
                                </button>
                              </div>
                            </div>
                          ))}
                      {scheduleOpen && (
                        <AddScheduleModal
                          onClose={() => setScheduleOpen(false)}
                          isEdit={isEdit}
                          eventID={selectEventID}
                        />
                      )}
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold">Status Kegiatan:</p>
                        <p className="bg-emerald-500 text-white text-center font-medium uppercase px-3 py-2 rounded-lg">
                          {event.event_status}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold">Harga:</p>
                        <p className="text-xl">
                          Rp. {formatPrice(event.price)}
                        </p>
                      </div>
                    </div>
                    <hr className="bg-slate-400" />
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleEdit(event)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={handlePopUpDelete}
                      >
                        Hapus
                      </button>
                      {isPopUpOpen && (
                        <PopUp
                          handle={() => handleDeleteEvent(event._id)}
                          onClose={() => setIsPopUpOpen(false)}
                          textPopUp="Apakah anda yakin ingin menghapus data ini?"
                          classNameBtn="bg-red-500"
                          textBtn="Hapus"
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
      {isModalOpen && (
        <AddEventModal
          onClose={() => setIsModalOpen(false)}
          isEdit={isEdit}
          eventData={selectedEvent}
        />
      )}
    </div>
  );
}
