import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCreateSchedule } from '../../redux/schedules/actions';
import { fetchAllTalents } from '../../redux/talents/actions';

export default function AddScheduleModal({ onClose, isEdit, eventID }) {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    schedules: [{ start_time: '', end_time: '' }],
    talentID: '',
  });
  const dispatch = useDispatch();
  const talents = useSelector((state) => state.talents.talents);

  useEffect(() => {
    dispatch(fetchAllTalents());
  }, [dispatch]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const schedules = [...formData.schedules];
    schedules[index][name] = value;
    setFormData({ ...formData, schedules });
  };

  const handleTalentChange = (e) => {
    setFormData({ ...formData, talentID: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(fetchCreateSchedule({ ...formData, eventID }));
      onClose();
    } catch (error) {
      setError('Error creating schedule');
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
        <h2 className="text-xl mb-4">
          {isEdit ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {formData.schedules.map((schedule, index) => (
            <div key={index} className="mb-4">
              <div className="mb-2">
                <label className="block mb-1">Waktu Mulai</label>
                <input
                  type="datetime-local"
                  name="start_time"
                  value={schedule.start_time}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Waktu Selesai</label>
                <input
                  type="datetime-local"
                  name="end_time"
                  value={schedule.end_time}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          ))}
          <div className="mb-4">
            <label className="block mb-1">Talent</label>
            <select
              name="talentID"
              value={formData.talentID}
              onChange={handleTalentChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Pilih Talent</option>
              {talents.map((talent) => (
                <option key={talent._id} value={talent._id}>
                  {talent.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddScheduleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  eventID: PropTypes.string.isRequired,
};
