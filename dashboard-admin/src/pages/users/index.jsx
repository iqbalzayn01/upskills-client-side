import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchAllUsers, fetchDeleteUser } from '../../redux/users/actions';

import Sidebar from '../../components/sidebar';
import PopUp from '../../components/popUp';
import AddUserModal from './addUserModal';

export default function DataUser() {
  const { users, error } = useSelector((state) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleCreateUser = () => {
    setIsEdit(false);
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setIsEdit(true);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handlePopUpDelete = () => {
    setIsPopUpOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(fetchDeleteUser(id));
    setIsPopUpOpen(false);
  };

  return (
    <div className="w-full">
      <Sidebar />
      <main className="ml-64 p-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl">Data User</h1>
          <button
            onClick={handleCreateUser}
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
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Nomor Telepon</th>
                <th className="text-left px-4 py-2">Role</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users
                  .filter((user) => user.role === 'peserta')
                  .map((user, index) => (
                    <tr key={user._id} className="border-t">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.no_telp}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                          onClick={() => handleEdit(user)}
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
                            handle={() => handleDelete(user._id)}
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
        <AddUserModal
          onClose={() => setIsModalOpen(false)}
          isEdit={isEdit}
          user={selectedUser}
        />
      )}
    </div>
  );
}
