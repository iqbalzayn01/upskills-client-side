import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  fetchAllTalents,
  fetchDeleteTalent,
} from '../../redux/talents/actions';

import Sidebar from '../../components/sidebar';
import PopUp from '../../components/popUp';
import AddTalentModal from './addTalentModal';

export default function DataNarasumber() {
  const { talents, error } = useSelector((state) => state.talents);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTalents());
  }, [dispatch]);

  const handleCreateTalent = () => {
    setIsEdit(false);
    setSelectedTalent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (talentData) => {
    setIsEdit(true);
    setSelectedTalent(talentData);
    setIsModalOpen(true);
  };

  const handlePopUpDelete = () => {
    setIsPopUpOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(fetchDeleteTalent(id));
    setIsPopUpOpen(false);
  };

  return (
    <div className="w-full">
      <Sidebar />
      <main className="ml-64 p-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl">Data Narasumber</h1>
          <button
            onClick={handleCreateTalent}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Tambah
          </button>
        </div>
        <hr className="mb-4" />
        {error && <p className="text-red-500">Error fetching data: {error}</p>}
        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">No</th>
                <th className="text-left px-4 py-2">Nama</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Nomor Telepon</th>
                <th className="text-left px-4 py-2">Role</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {talents &&
                talents
                  .filter((talent) => talent.role === 'narasumber')
                  .map((talent, index) => (
                    <tr key={talent._id} className="border-t">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{talent.name}</td>
                      <td className="px-4 py-2">{talent.email}</td>
                      <td className="px-4 py-2">{talent.no_telp}</td>
                      <td className="px-4 py-2">{talent.role}</td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                          onClick={() => handleEdit(talent)}
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
                            handle={() => handleDelete(talent._id)}
                            onClose={() => setIsPopUpOpen(false)}
                            textPopUp="Apakah anda yakin ingin menghapus data ini?"
                            classNameBtn="bg-red-500"
                            textBtn="Hapus"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </main>
      {isModalOpen && (
        <AddTalentModal
          onClose={() => setIsModalOpen(false)}
          isEdit={isEdit}
          talentData={selectedTalent}
        />
      )}
    </div>
  );
}
