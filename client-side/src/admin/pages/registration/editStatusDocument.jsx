import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchUpdateDocument } from '../../../redux/uploadDocument/actions';

export default function EditStatusDocument({ onClose, isEdit, dataDocument }) {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    data_valid: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && dataDocument) {
      setFormData({
        ...dataDocument,
      });
    }
  }, [isEdit, dataDocument]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(fetchUpdateDocument(dataDocument._id, formData));

      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError('Gagal Memperbarui Data!');
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
        <h2 className="text-xl mb-4">Status Dokumen</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* <label className="block mb-1">Status Dokumen</label> */}
            <select
              name="data_valid"
              value={formData.data_valid}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Belum Diperiksa">Belum Diperiksa</option>
              <option value="Data Valid">Data Valid</option>
              <option value="Data Tidak Valid">Data Tidak Valid</option>
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

EditStatusDocument.propTypes = {
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  dataDocument: PropTypes.object,
};
