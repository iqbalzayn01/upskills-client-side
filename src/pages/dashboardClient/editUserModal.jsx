import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchUpdateUser } from '../../redux/users/actions';

export default function EditUserModal({ onClose, isEdit, user }) {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    no_telp: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && user) {
      setFormData({
        ...user,
        password: '',
        confirmPassword: '',
      });
    }
  }, [isEdit, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan Confirm Password tidak cocok');
      return;
    }

    if (user) {
      dispatch(fetchUpdateUser(user._id, formData));
      window.location.reload();
    } else {
      console.log(Error);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl mb-4">
          {isEdit ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
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
            <label className="block mb-1">Nomor Telepon</label>
            <input
              type="text"
              name="no_telp"
              value={formData.no_telp}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
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

EditUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  user: PropTypes.object,
};
