import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { clearToken } from '../../../redux/auth/actions';

import PopUp from '../PopUp';

export default function Sidebar() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePopUpLogout = () => {
    setIsPopUpOpen(true);
  };

  const handleLogout = () => {
    dispatch(clearToken());
    setIsPopUpOpen(false);
    navigate('/signin');
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <ul className="py-4">
        <li className="px-4 mb-10">
          <Link to="/dashboard" className="text-3xl font-medium">
            Insightful Events <i>Admin</i>
          </Link>
        </li>
        <li className="w-full hover:bg-slate-500 px-4 py-4 mb-4">
          <Link to="/dashboard-admin">Dashboard</Link>
        </li>
        <li className="w-full hover:bg-slate-500 px-4 py-4 mb-4">
          <Link to="/data-user">Data User</Link>
        </li>
        <li className="w-full hover:bg-slate-500 px-4 py-4 mb-4">
          <Link to="/data-narasumber">Data Narasumber</Link>
        </li>
        <li className="w-full hover:bg-slate-500 px-4 py-4 mb-4">
          <Link to="/data-kegiatan">Data Kegiatan Pelatihan</Link>
        </li>
        <li className="w-full hover:bg-slate-500 px-4 py-4 mb-4">
          <Link to="/data-pendaftaran">Data Pendaftaran</Link>
        </li>
        <li className="w-full hover:bg-slate-500 px-4 py-4 mb-4">
          <Link to="/data-pembayaran">Data Pembayaran</Link>
        </li>
      </ul>
      <hr className="mx-4 mb-4" />
      <div className="w-full hover:bg-slate-500 px-4 py-4 mb-4">
        <button onClick={handlePopUpLogout} className=" text-red-500">
          Log out
        </button>
      </div>
      {isPopUpOpen && (
        <PopUp
          handle={handleLogout}
          onClose={() => setIsPopUpOpen(false)}
          textPopUp="Apakah anda yakin ingin keluar?"
          classNameBtn="bg-red-500"
          textBtn="Log out"
        />
      )}
    </div>
  );
}
