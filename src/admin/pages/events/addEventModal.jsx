import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchCreateEvent,
  fetchUpdateEvent,
} from '../../../redux/events/actions';

import { fetchUploadImages } from '../../../redux/uploadImages/actions';

export default function AddEventModal({ onClose, isEdit, eventData }) {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    event_status: '',
    location: '',
    price: '',
    linkMeeting: '-',
    kuota: '',
  });
  const dispatch = useDispatch();

  const [fileImage, setFileImage] = useState(null);

  useEffect(() => {
    if (isEdit && eventData) {
      setFormData({
        ...eventData,
      });
    }
  }, [isEdit, eventData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileImage && !isEdit) {
      alert('Mohon untuk mengunggah gambar.');
      return;
    }

    let imageID;
    if (fileImage) {
      const formDataImage = new FormData();
      formDataImage.append('image', fileImage);

      const response = await dispatch(fetchUploadImages(formDataImage));
      imageID = response._id;
    }

    const { name, description, location, event_status, price } = formData;

    if (!name || !description || !location || !event_status || !price) {
      setError('Semua bidang harus diisi.');
      return;
    }

    const newEventData = {
      ...formData,
      ...(imageID && { imageID }),
    };

    if (isEdit) {
      dispatch(fetchUpdateEvent(eventData._id, newEventData));
    } else {
      dispatch(fetchCreateEvent(newEventData));
    }

    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
        <h2 className="text-xl mb-4">
          {isEdit ? 'Edit Event' : 'Tambah Event Baru'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Nama Event</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Deskripsi Event</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Link Meeting</label>
            <input
              type="text"
              name="linkMeeting"
              value={formData.linkMeeting}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Lokasi Event</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status Kegiatan</label>
            <select
              name="event_status"
              value={formData.event_status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Pilih Status</option>
              <option value="buka">Buka</option>
              <option value="tutup">Tutup</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Harga</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Kuota</label>
            <input
              type="number"
              name="kuota"
              value={formData.kuota}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {!isEdit && (
            <div className="mb-4">
              <label htmlFor="fileName" className="text-sm text-gray-500">
                Unggah Gambar
              </label>
              <input
                id="fileName"
                name="fileName"
                type="file"
                className="block w-full px-3 py-2 mt-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
              />
            </div>
          )}
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

AddEventModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  eventData: PropTypes.object,
};
