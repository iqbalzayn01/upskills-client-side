import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  fetchAllRegistration,
  fetchDeleteRegister,
} from '../../../redux/registration/actions';
import { fetchDeleteDocument } from '../../../redux/uploadDocument/actions';

import Sidebar from '../../components/Sidebar';
import PopUp from '../../components/PopUp';
import EditStatusDocument from './editStatusDocument';

export default function DataPendaftaran() {
  const { registrations } = useSelector((state) => state.registration);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectRegisterID, setSelectRegisterID] = useState({
    registerID: null,
    documentID: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRegistration());
  }, [dispatch]);

  const handleEdit = (documentID) => {
    setIsEdit(true);
    setSelectedDocument(documentID);
    setIsModalOpen(true);
  };

  const handlePopUpDelete = (registerID, documentID) => {
    setSelectRegisterID({ registerID, documentID });
    setIsPopUpOpen(true);
  };

  const handleDelete = () => {
    dispatch(fetchDeleteRegister(selectRegisterID.registerID));
    dispatch(fetchDeleteDocument(selectRegisterID.documentID));
    setIsPopUpOpen(false);
  };

  return (
    <div className="w-full">
      <Sidebar />
      <main className="ml-64 p-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl">Data Pendaftaran</h1>
        </div>
        <hr className="border border-gray-300 mb-10" />
        {/* Data Pendaftaran */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">No</th>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Kode Pelatihan</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Nomor Telepon</th>
                <th className="text-left px-4 py-2">Role</th>
                <th className="text-left px-4 py-2">Dokumen</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations && registrations.length > 0 ? (
                registrations
                  .filter((register) => register?.userID?.role === 'peserta')
                  .map((register, index) => (
                    <tr key={register._id} className="border-t">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{register.userID.name}</td>
                      <td className="px-4 py-2">{register.eventID.id_event}</td>
                      <td className="px-4 py-2">{register.userID.email}</td>
                      <td className="px-4 py-2">{register.userID.no_telp}</td>
                      <td className="px-4 py-2">{register.userID.role}</td>
                      <td className="px-4 py-2">
                        <Link
                          to={`http://localhost:9000/${register.documentID.fileName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Lihat Dokumen
                        </Link>
                      </td>
                      <td className="px-4 py-2">
                        {register.documentID.data_valid}
                      </td>
                      <td className="grid grid-cols-2 px-4 py-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                          onClick={() => handleEdit(register.documentID)}
                        >
                          Periksa
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() =>
                            handlePopUpDelete(
                              register._id,
                              register.documentID._id
                            )
                          }
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center px-4 py-2 text-gray-500"
                  >
                    Belum ada data pendaftaran yang ditambahkan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {isPopUpOpen && (
          <PopUp
            handle={handleDelete}
            onClose={() => setIsPopUpOpen(false)}
            textPopUp="Apakah anda yakin ingin menghapus data ini?"
            classNameBtn="bg-red-500"
            textBtn="Hapus"
          />
        )}
      </main>
      {isModalOpen && (
        <EditStatusDocument
          onClose={() => setIsModalOpen(false)}
          isEdit={isEdit}
          dataDocument={selectedDocument}
        />
      )}
    </div>
  );
}
