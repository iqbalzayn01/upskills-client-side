import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import config from '../../../config';

import {
  fetchAllEvents,
  fetchDeleteEvent,
} from '../../../redux/events/actions';
import {
  fetchAllSchedules,
  fetchDeleteSchedule,
} from '../../../redux/schedules/actions';

import Sidebar from '../../components/Sidebar';
import PopUp from '../../components/PopUp';
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
  const BASE_URL = config.url;

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
        <hr className=" border border-gray-300 mb-10" />
        {error && <p className="text-red-500">Error fetching data: {error}</p>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {events && events.length > 0 ? (
            events.map((event) => {
              const eventSchedules = schedules.filter(
                (schedule) => schedule.eventID._id === event._id
              );

              return (
                <div
                  key={event._id}
                  className="card border border-slate-400 p-6 rounded-lg"
                >
                  <div className="flex flex-col gap-6">
                    {event.imageID && event.imageID.fileName && (
                      <img
                        src={`${BASE_URL}${event.imageID.fileName}`}
                        alt={event.name}
                        className="w-full h-auto rounded-lg"
                      />
                    )}
                    <h2 className="text-2xl font-medium">{event.name}</h2>
                    <hr className=" border border-gray-300" />
                    <p>{event.description}</p>
                    <div className="flex flex-col">
                      {eventSchedules.length > 0 ? (
                        eventSchedules.map((schedule, index) => (
                          <div key={index}>
                            <p>Talent: {schedule.talentID.name}</p>
                            <div>
                              <p className="font-semibold">Jadwal:</p>
                              {schedule.schedules.map((time, subIndex) => (
                                <div key={subIndex}>
                                  <p>
                                    Mulai: {formatDateTime(time.start_time)}
                                  </p>
                                  <p>
                                    Selesai: {formatDateTime(time.end_time)}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => handleDeleteSchedule(schedule._id)}
                            >
                              Hapus
                            </button>
                          </div>
                        ))
                      ) : (
                        <button
                          className="bg-emerald-500 text-white px-2 py-1 rounded"
                          onClick={() => handleCreateSchedule(event._id)}
                        >
                          Atur Jadwal
                        </button>
                      )}
                      {scheduleOpen && (
                        <AddScheduleModal
                          onClose={() => setScheduleOpen(false)}
                          isEdit={isEdit}
                          eventID={selectEventID}
                        />
                      )}
                    </div>
                    <p>Link: {event.linkMeeting}</p>
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold">Lokasi:</p>
                      <p>{event.location}</p>
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
                    <hr className=" border border-gray-300" />
                    <div className="grid gap-2">
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
            })
          ) : (
            <p className="text-gray-500">
              Belum ada kegiatan pelatihan yang ditambahkan
            </p>
          )}
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
